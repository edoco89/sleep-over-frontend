<template>
  <section v-if="this.user" class="bed-manager">
    <div class="bed-list">
      <span>Your Beds</span>
      <router-link to="/bedEdit" href="#">Add Bed</router-link>

      <div v-if="bed" v-for="(bed, idx) in user.hostBeds" :key="bed._id" class="user-bed">
        <photo-carusel class="user-photo-carusel" :pics="bed.imgUrls"></photo-carusel>
        <div class="bed-details">
          <div class="prev-header">
            <b>Your {{bed.type}} In {{bed.location.address}}</b>
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
          <v-calendar :attributes="attr[idx]" is-expanded style='width: 100%'>
            <div slot="confirm-stay" slot-scope="{ customData }" class="confirm-stay">
              <div v-if="!customData.isConfirmed">
                <p>{{customData.name}} Has requested to book this dates</p>
                <button @click="confirmBooking(customData.bedId ,customData.start)">Confirm</button>
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
    confirmBooking(id, start) {
      const bookedBed = this.user.hostBeds.find(bed => bed._id === id);
      bookedBed.unAvailable.find(booking => {
        if (booking.start === start) booking.isConfirmed = true;
      });
      this.$store.dispatch({
        type: "saveBed",
        bed: bookedBed,
        user: this.user
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

.bed-manager {
  width: 90%;
  margin: auto;
}
.calender-container {
    width: 50%;
  height: 85%;
  padding: 10px;
}

.profile-container {
  width: $container;
  margin: auto;
}

.user-card {
  width: 100%;
}

.bed-list {
  margin-top: 10px;
  text-align: left;
  span {
    font-size: 25px;
    margin-right: 15px;
  }
}

.user-bed {
  // border: 1px solid $border-color;
  border: 1px solid #8d8c8c;
  position: relative;
  color: #222222;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  text-align: left;
  height: 300px;
  .user-photo-carusel {
    width: 45%;
    height: 100%;
    // padding: 10px;
    // margin: 5px;
  }
  .amenities-prev {
    height: 100px;
    margin-top: 5px;
    section {
      height: 100%;
    }
  }
  .bed-details {
    padding: 10px;
    margin: 5px;
    width: 50%;
    height: 100%;
    .prev-header {
      margin-bottom: 10px;
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

@media (max-width: 1000px) {
  .amenities-prev {
    display: none;
  }
  .user-bed {
    .bed-details {
      width: 30%;
    }
  }
  .user-photo-carusel {
  }
}
@media (max-width: 750px) {
  .user-bed {
    height: 200px;
  }
}
</style>
