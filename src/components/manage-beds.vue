<template>
  <section v-if="this.user" class="bed-manager">
    <div class="bed-list">
      <h3>Your Beds:</h3>
      <router-link to="/bedEdit" href="#">Add Bed</router-link>

      <div v-if="bed" v-for="(bed, idx) in user.hostBeds" :key="bed._id" class="user-bed">
        <photo-carusel class="user-photo-carusel" :pics="bed.imgUrls"></photo-carusel>
        <div class="bed-details">
          <div class="prev-header">
            <p>Your {{bed.type}} In {{bed.location.address}}</p>
          </div>
          <router-link :to="'/bedEdit/' + bed._id" href="#">Edit Bed</router-link>
          <a href="#" v-if="bed.reviews.length > 0" @click="showModal = true">See Reviews</a>
          <div class="amenities-prev">
            <bed-amenities :aments="bed.ameneties"></bed-amenities>
          </div>
          <div class="bed-prev-rating">
            <img src="@/assets/img/star.png">
            <span>{{bed.rating}}</span>
          </div>
        </div>
        <div class="calender-container">
          <link rel="stylesheet" href="https://unpkg.com/v-calendar/lib/v-calendar.min.css">
          <link
            rel="stylesheet"
            href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css"
          >
          <v-calendar :attributes="attr[idx]" is-expanded style="width: 100%">
            <div slot="confirm-stay" slot-scope="{ customData }" class="confirm-stay">
              <div v-if="!customData.isConfirmed">
                <p>{{customData.name}} Has requested to book this dates</p>
                <button @click="confirmBooking(customData.bedId ,customData.start, customData.guestId)">Confirm</button>
                <button @click="DeclineBooking(customData.bedId ,customData.start, customData.guestId)">Decline</button>
                <a href="#" @click="showUserDetails(customData.guestId)">More on {{customData.name}}</a>
              </div>
              <div v-else>
                <p>{{customData.name}} is coming to stay!</p>
              </div>
            </div>
          </v-calendar>
        </div>
      </div>
    </div>

    <div :class="{'is-active' : showModal}" class="modal">
      <div @click="isDetails = false; showModal = false" class="modal-background"></div>
      <div class="modal-content">
        <user-details v-if="isDetails" :user="currUser"></user-details>
        <ul v-else>
          <li v-for="(review,idx) in user.reviews" :key="idx">{{review}}</li>
        </ul>
      </div>
      <button
        @click="isDetails = false; showModal = false"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  </section>
</template>

<script>
import photoCarusel from "@/components/photo-carousel.vue";
import bedAmenities from "@/components/bed-amenities.vue";
import userDetails from "@/components/userDetails.vue";
export default {
  data() {
    return {
      showModal: false,
      isDetails: false,
      currUser: null
    };
  },
  computed: {
    user() {
      return JSON.parse(JSON.stringify(this.$store.getters.loggedInUser));
    },
    attr() {
      if (!this.user) return;
      return this.user.hostBeds.map((bed, idx) => {
        return [
          ...bed.unAvailable.map((book, secIdx) => {
            book.bedId = bed._id;
            return {
              highlight: {
                backgroundColor: !book.isConfirmed ? "#7CC75E" : "#ff8080"
              },
              contentStyle: {
                color: "#fafafa"
              },
              themeStyles: {
                wrapper: {
                  height: "50%"
                }
              },
              dates: book,
              customData: book,
              popover: {
                slot: "confirm-stay"
              }
            };
          })
        ];
      });
    }
  },
  methods: {
    showUserDetails(id) {
      this.$store.dispatch({ type: "getUserById", id }).then(gotUser => {
        this.currUser = { ...gotUser };
        this.isDetails = true;
        this.showModal = true;
      });
    },
    DeclineBooking(bedId, start, hostId) {
      const bookedBed = this.user.hostBeds.find(bed => bed._id === bedId);
      const removeDatesIdx = bookedBed.unAvailable.findIndex(
        booking => booking.start === start
      );
      bookedBed.unAvailable.splice(removeDatesIdx, 1);
      this.$store.dispatch({
        type: "saveBed",
        bed: bookedBed,
        user: this.user
      });
      this.$socket.emit("setNewBookRequestL", {
        userId: this.user._id
      });
      let msg = {
        from: this.user._id,
        txt: `NOPE`,
        isRead: false,
        timestamp: Date.now()
      };
      this.sendBookResponse(msg, hostId)
    },
    confirmBooking(bedId, start, hostId) {
      const bookedBed = this.user.hostBeds.find(bed => bed._id === bedId);
      bookedBed.unAvailable.find(booking => {
        if (booking.start === start) booking.isConfirmed = true;
      });
      this.$store.dispatch({
        type: "saveBed",
        bed: bookedBed,
        user: this.user
      });
      this.$socket.emit("setNewBookRequestL", {
        userId: this.user._id
      });
      let msg = {
        from: this.user._id,
        txt: `I'm so happy that you are comming for a sleepover at my place, It's going to be so much fun.
              p.s - I like to watch people eat and sleep, and even better when its both, so be prepared`,
        isRead: false,
        timestamp: Date.now()
      };
      this.sendBookResponse(msg, hostId)
    },
    sendBookResponse(message, hostId) {
      this.$store
        .dispatch({
          type: "getChatByIds",
          userId1: this.user._id,
          userId2: hostId
        })
        .then(chat => {
          if (!chat) {
            return this.$store.dispatch({
              type: "createChatByIds",
              userId1: this.user._id,
              userId2: hostId
            });
          }
          return chat;
        })
        .then(chat => {
          this.$store.dispatch({
            type: "getChatsById",
            userId: this.user._id
          });
          this.$socket.emit("chatRequest", {
            currUserId: this.user._id,
            userId: hostId,
            chatId: chat._id
          });
          return chat._id;
        })
        .then(chatId => {
          this.$socket.emit("sendMsg", {
            chatId,
            message,
            userId: this.user._id
          });
        });
    }
  },
  components: {
    photoCarusel,
    bedAmenities,
    userDetails
  }
};
</script>


<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

h3 {
  text-decoration: underline;
}

.bed-manager {
  width: 100%;
  border: 1px solid lightgray;
  border-top: none;
}

.profile-container {
  width: $container;
  margin: auto;
}

.user-card {
  width: 100%;
}

.bed-list {
  padding-top: 10px;
  text-align: left;
  width: 95%;
  margin: auto;
  a {
    width: fit-content;
    border: none;
    color: rgb(85, 143, 252);
    padding: 0;
    &:hover {
      border-bottom-color: none;
      color: rgb(85, 143, 252);
    }
  }
}

.user-bed {
  border: 1px solid #8d8c8c;
  position: relative;
  color: #222222;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
  .user-photo-carusel {
    width: 100%;
    height: 200px;
  }
  .amenities-prev {
    display: none;
  }
  .calender-container {
    padding: 10px;
    padding-top: 0;
    margin-bottom: 30px;
  }
  .bed-details {
    padding: 10px;
    .prev-header {
      margin-bottom: 5px;
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
      }
    }
    a {
      margin-right: 10px;
      font-family: $main-font-bold;
      font-size: 14px;
      font-style: italic;
    }
  }
  .bed-prev-rating {
    position: absolute;
    bottom: 0;
    font-family: $main-font-bold;
    padding: 5px 0;
    span {
      font-size: 20px;
      margin-left: 8px;
    }
  }
}
.about-me-box {
  grid-column-start: 3;
  grid-column-end: -1;
  grid-row-start: 2;
  grid-row-end: -1;
  background-color: rgb(231, 225, 225);
  display: flex;
  flex-direction: column;
}

.community-box {
  grid-column: 1;
  background-color: beige;
}

.review-box {
  grid-column: 1;
  background-color: rgb(243, 212, 218);
}

.user-photo-carusel {
  height: 100%;
  width: 100%;
}

.user-details-container {
  border: 1px solid #8d8c8c;
  border-top: none;
  b {
    font-family: $main-font-bold;
  }
  padding-top: 10px;
}

@media (min-width: 1000px) {
  .amenities-prev {
    display: none;
  }
}
@media (max-width: 750px) {
}
</style>
