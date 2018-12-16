<template>
  <section v-if="this.user" class="bed-manager">
    <router-link class="first-bed" to="/bedEdit" v-if="user.hostBeds.length===0">
      <img src="@/assets/img/add-bed.png" title="Add Your First Bed">
      <h2>Add Your first Bed</h2>
    </router-link>
    <div v-else class="bed-list">
      <div class="list-header">
        <h4>Your Beds</h4>
        <router-link to="/bedEdit" href="#">Add Bed</router-link>
      </div>
      <div v-if="bed" v-for="(bed, idx) in user.hostBeds" :key="bed._id" class="user-bed">
        <section class="bed-preview">
          <photo-carusel class="user-photo-carusel" :pics="bed.imgUrls"></photo-carusel>
          <div class="bed-details">
            <div class="prev-header">
              <p>Your {{bed.type}} In {{bed.location.address}}</p>
            </div>
            <div class="bed-links">
              <router-link :to="'/bedEdit/' + bed._id" href="#">Edit Bed</router-link>
              <div v-if="bed.reviews.length > 0">
                &nbsp;|&nbsp;
                <a href="#" @click="showReviews(bed)">See Reviews</a>
              </div>
            </div>
            <div class="amenities-prev">
              <bed-amenities :aments="bed.ameneties"></bed-amenities>
            </div>
            <div class="bed-prev-rating">
              <img src="@/assets/img/star.png">
              <span>{{bed.rating}}</span>
            </div>
          </div>
        </section>
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
                <button
                  @click="confirmBooking(customData.bedId ,customData.start,customData.end, customData.guestId)"
                >Confirm</button>
                <button
                  @click="DeclineBooking(customData.bedId ,customData.start, customData.guestId)"
                >Decline</button>
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

    <section :class="{'is-active' : showModal}" class="modal">
      <div @click="isDetails = false; showModal = false" class="modal-background"></div>
      <section class="modal-content">
        <user-details v-if="isDetails" :user="currUser"></user-details>
        <section v-if="currBed && !isDetails">
          <div v-for="review in currBed.reviews" :key="review.index" class="review-container">
            <div class="review-preview">
              <img width="80" :src="review.reviewerImg">
              <div class="bold user-box-review">{{review.givenByName}}</div>
              <star-rating :star-size="15" v-model="review.rating"></star-rating>
            </div>
            <span>
              <b>{{review.givenByName}}:</b>
              {{review.txt}}
            </span>
          </div>
        </section>
      </section>
      <button
        @click="isDetails = false; showModal = false"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </section>
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
      currBed: null
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
    showReviews(bed) {
      this.currBed = bed;
      this.isDetails = false;
      this.showModal = true;
    },
    showUserDetails(id) {
      this.$store.dispatch({ type: "getUserById", id }).then(gotUser => {
        this.currUser = { ...gotUser };
        this.isDetails = true;
        this.showModal = true;
      });
    },
    DeclineBooking(bedId, start, guestId) {
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
      this.sendBookResponse(msg, guestId);
    },
    confirmBooking(bedId, start, end, guestId) {
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
        userId: this.user._id,
        guestId,
        sleepOver: {
          start,
          end,
          bedId,
          hostId: this.user._id
        }
      });
      let msg = {
        from: this.user._id,
        txt: `I'm so happy that you are comming for a sleepover at my place, It's going to be so much fun.
              p.s - I like to watch people eat and sleep, and even better when its both, so be prepared`,
        isRead: false,
        timestamp: Date.now()
      };
      this.sendBookResponse(msg, guestId);
    },
    sendBookResponse(message, guestId) {
      this.$store
        .dispatch({
          type: "getChatByIds",
          userId1: this.user._id,
          userId2: guestId
        })
        .then(chat => {
          if (!chat) {
            return this.$store.dispatch({
              type: "createChatByIds",
              userId1: this.user._id,
              userId2: guestId
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
            userId: guestId,
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

.list-header {
  display: flex;
  a {
    margin-left: 10px;
    font-style: italic;
  }
  h4 {
    margin: 0 5px;
  }
}

.bed-preview {
  font-family: $main-font-bold;
}
.bed-list {
  padding-top: 10px;
  text-align: left;
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
.tabs a:hover {
  border: none;
}

.user-bed {
  border-bottom: 1px solid lightgray;
  position: relative;
  color: #222222;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
  .bed-links {
    display: flex;
    div {
      display: flex;
      color: rgb(85, 143, 252);
      font-style: italic;
    }
  }
  .user-photo-carusel {
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

.modal-content{
  width: 80%;
}

@media (min-width: 500px) {
  .user-bed {
    padding: 5px 35px;
    margin-top: 5px;
    .user-photo-carusel {
      height: 240px;
    }
    .calender-container {
      padding: 0px;
    }
    .bed-details {
      padding: 8px 0;
    }
  }
  .list-header {
    h4 {
      margin: 0px 35px;
    }
    a {
      margin: 0;
    }
  }
}

.bed-manager {
  width: 100%;
  border: 1px solid lightgray;
  border-top: none;
}

@media (min-width: 650px) {
  .user-bed {
    padding: 5px 15px;
    flex-direction: row;
    justify-content: space-between;
    .user-photo-carusel {
      height: 220px;
    }
  }
  .bed-preview {
    width: 50%;
    margin-right: 10px;
    margin-bottom: 35px;
  }
}

@media (min-width: 950px) {
  .bed-preview {
    width: 70%;
    display: flex;
    margin-bottom: 0;
    .user-photo-carusel {
      width: 50%;
      height: 100%;
    }
    .bed-details {
      padding: 0;
      width: 50%;
      margin-left: 10px;
      p {
        font-size: 20px;
      }
    }
    .amenities-prev {
      margin-top: 10px;
      display: block;
      font-family: $main-font-light;
      height: 200px;
      overflow: hidden;
    }
  }
}
@media (min-width: 1050px) {
  .user-bed {
    padding: 5px 35px;
  }
}
////////////////////////////////////

// .profile-container {
//   width: $container;
//   margin: auto;
// }

// .about-me-box {
//   grid-column-start: 3;
//   grid-column-end: -1;
//   grid-row-start: 2;
//   grid-row-end: -1;
//   background-color: rgb(231, 225, 225);
//   display: flex;
//   flex-direction: column;
// }

// .community-box {
//   grid-column: 1;
//   background-color: beige;
// }

// .review-box {
//   grid-column: 1;
//   background-color: rgb(243, 212, 218);
// }

// .user-photo-carusel {
//   height: 100%;
//   width: 100%;
// }

// .user-details-container {
//   border: 1px solid #8d8c8c;
//   border-top: none;
//   b {
//     font-family: $main-font-bold;
//   }
//   padding-top: 10px;
// }
</style>
