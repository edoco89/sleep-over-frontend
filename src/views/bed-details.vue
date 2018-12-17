<template>
  <section v-if="bed" class="bed-details">
    <div ref="topfocus" class="img-gallery">
      <img class="main-img" :src="bed.hostImg">
      <div class="gallery-imgs">
        <!-- ONE IMG OR LESS -->
        <div v-if="bed.imgUrls.length < 2" class="one-img-display">
          <img v-if="bed.imgUrls.length > 0" @click="openGallery" :src="bed.imgUrls[0]">
          <img v-else src="@/assets/img/no-img.jpg">
        </div>
        <!-- TWO IMG -->
        <div v-if="bed.imgUrls.length === 2" class="two-img-display">
          <img @click="openGallery" :src="bed.imgUrls[0]">
          <img @click="openGallery" :src="bed.imgUrls[1]">
        </div>
        <!-- THREE IMG -->
        <div v-if="bed.imgUrls.length === 3" class="three-img-display">
          <img class="img1" @click="openGallery" :src="bed.imgUrls[0]">
          <div>
            <img @click="openGallery" :src="bed.imgUrls[1]">
            <img @click="openGallery" :src="bed.imgUrls[2]">
          </div>
        </div>
        <!-- FOUR IMG -->
        <div v-if="bed.imgUrls.length > 3" class="four-img-display">
          <img @click="openGallery" :src="bed.imgUrls[0]">
          <img @click="openGallery" :src="bed.imgUrls[1]">
          <img @click="openGallery" :src="bed.imgUrls[2]">
          <img @click="openGallery" :src="bed.imgUrls[3]">
        </div>
      </div>
    </div>

    <div class="details-bottom">
      <div class="left-section">
        <div class="top-desc">
          <b>{{bed.hostName + "'s " + bed.type}}</b>
          <p>{{bed.location.address}}</p>
          <a href="#" @click="openDetails">{{'More on ' + bed.hostName}}</a>
        </div>
        <div class="host-details">
          <h4>
            <b>Host Rating:</b>
            <img src="@/assets/img/star.png">
            {{bed.rating}}
          </h4>
          <h4 v-if="bedHost && bedHost.aboutMe">
            <b>About Me:</b>
            <br>
            {{bedHost.aboutMe}}
          </h4>
          <h4 v-if="bed.languages.length > 0">
            <b>Languages:</b>
            {{bed.languages.join(', ')}}
          </h4>
          <div>
            <bed-amenities :aments="bed.ameneties"></bed-amenities>
          </div>
        </div>
      </div>
      <div class="booking-container">
        <div class="chat-container">
          <a @click="openChat">
            <img class="chat-btn" src="@/assets/img/chat.png">
          </a>
          <span class="secondary-header">{{'Chat with ' + bed.hostName}}</span>
        </div>
        <book-bed
          @bookRequest="bookRequest"
          :unAvailable="bed.unAvailable"
          :class="(bookedMsg === 'hide-msg')? 'show-msg': 'hide-msg'"
        ></book-bed>
        <span :class="loginMsg">Please Log-In to book a bed</span>
        <!-- BOOKED MSG -->
        <div :class="'booking-msg-container ' + bookedMsg">
          <b v-if="bedHost">Your request has been sent to {{bedHost.fullname}}!</b>
          <br>
          <span v-if="askedBookDates"></span>
          <p>An answer will be sent shortly</p>
        </div>
        <div class="map-container">
          <!-- v-if="bed" -->
          <GmapMap
            ref="map"
            :center="mapCenter"
            :zoom="13"
            :options="mapStyle"
            map-type-id="terrain"
            style="width: 100%; height: 100%"
          >
            <GmapMarker
              :position="mapCenter"
              :clickable="false"
              :icon="{ url : require('@/assets/img/map-marker.png')}"
              :draggable="false"
            />
          </GmapMap>
        </div>
      </div>
    </div>
    <!-- v-if="bed.reviews.length > 0" -->
    <div class="reviews">
      <b>Reviews:</b>
      <a href="#" @click="addReviewOpen = !addReviewOpen;">Add Review</a>
      <div class="review-add" v-if="addReviewOpen">
        <p>Hi {{user.fullname}}, do tell us what you thought of your time with {{bed.hostName}}!</p>
        <textarea v-model="newReview.txt"></textarea>
        <div>
          <star-rating star-size="20" v-model="newReview.rating"></star-rating>
        </div>
        <button @click="saveReview">Save</button>
      </div>
      <div class="review-container" v-for="review in bed.reviews" :key="review.index">
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
    </div>

    <!-- modal -->
    <div :class="{'is-active' : showModal}" class="modal">
      <div @click="closeModal" class="modal-background"></div>
      <div class="modal-content-details">
        <user-details class="host-details-modal" :user="bedHost" v-if="isDetalis"></user-details>
        <photo-carusel class="carousel-gallery" v-else :pics="bed.imgUrls"></photo-carusel>
      </div>
      <button @click="closeModal" class="modal-close is-large" aria-label="close"></button>
    </div>
    <chat-modal :showChatModal="showChatModal" @closeModal="closeModal"></chat-modal>
  </section>
</template>
<script>
import bookBed from "@/components/book-bed.vue";
import chatModal from "./user-chat.vue";
import bedAmenities from "@/components/bed-amenities.vue";
import photoCarusel from "@/components/photo-carousel.vue";
import userDetails from "@/components/userDetails.vue";

export default {
  data() {
    return {
      loginMsg: "hide-msg",
      bookedMsg: "hide-msg",
      showModal: false,
      isBook: false,
      isDetalis: false,
      bedHost: null,
      addReviewOpen: false,
      newReview: {
        givenByName: null,
        txt: null,
        givenByUserId: null,
        bedId: null,
        rating: null,
        reviewerImg: null
      },
      mapStyle: {
        disableDefaultUI: true,
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#ebe3cd"
              }
            ]
          },
          {
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#f4edb5"
              },
              {
                saturation: 10
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#ca6500"
              },
              {
                visibility: "on"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#f5f1e6"
              }
            ]
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#c9b2a6"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#dcd2be"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#ae9e90"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
              {
                color: "#dfd2ae"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#dfd2ae"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#93817c"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#a5b076"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#447530"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#f5f1e6"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: "#fdfcf8"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#f8c967"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#e9bc62"
              }
            ]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [
              {
                color: "#e98d58"
              }
            ]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#db8555"
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#806b63"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [
              {
                color: "#dfd2ae"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#8f7d77"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#ebe3cd"
              }
            ]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
              {
                color: "#dfd2ae"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#8db89c"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#92998d"
              }
            ]
          }
        ]
      },
      askedBookDates: null,
      showChatModal: false
    };
  },
  mounted() {
    console.log(this.$refs.topfocus);
    this.$refs.topfocus.scrollTo(0, 50)
  },
  created() {
    const bedId = this.$route.params.bedId;
    if (bedId) {
      this.$store.dispatch({ type: "getBedById", bedId }).then(bed => {
        this.$store
          .dispatch({ type: "getUserById", id: this.bed.hostId })
          .then(user => (this.bedHost = user));
      });
    }
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.showChatModal = false;
    },
    openDetails() {
      this.isDetalis = true;
      this.showModal = true;
    },
    openGallery() {
      this.isDetalis = false;
      this.showModal = true;
    },
    bookRequest(askedDates) {
      if (!this.$store.getters.loggedInUser) {
        this.loginMsg = "show-msg";
        setTimeout(() => (this.loginMsg = "hide-msg"), 3000);
        return;
      }
      this.bookedMsg = "show-msg";
      this.askedBookDates = { ...askedDates };
      this.askedBookDates.name = this.user.fullname;
      this.askedBookDates.isConfirmed = false;
      this.askedBookDates.guestId = this.user._id;
      this.bed.unAvailable.push(this.askedBookDates);
      this.$store
        .dispatch({
          type: "saveBed",
          bed: this.bed,
          user: this.user,
          isNeeded: true
        })
        .then(bed => {
          this.$socket.emit("bookRequest", {
            hostId: bed.hostId
          });
        });
    },
    openChat() {
      const loggedInUser = JSON.parse(
        JSON.stringify(this.$store.getters.loggedInUser)
      );
      this.$store
        .dispatch({
          type: "getChatByIds",
          userId1: loggedInUser._id,
          userId2: this.bedHost._id
        })
        .then(chat => {
          if (!chat) {
            return this.$store.dispatch({
              type: "createChatByIds",
              userId1: loggedInUser._id,
              userId2: this.bedHost._id
            });
          }
          return chat;
        })
        .then(chat => {
          this.$socket.emit("chatRequest", {
            currUserId: loggedInUser._id,
            userId: this.bedHost._id,
            chatId: chat._id
          });
          this.$store.dispatch({
            type: "getChatsById",
            userId: loggedInUser._id
          });
          this.showChatModal = true;
        });
    },
    saveReview() {
      this.addReviewOpen = false;
      const loggedInUser = this.$store.getters.loggedInUser;
      this.newReview.givenByName = loggedInUser.fullname;
      this.newReview.givenByUserId = loggedInUser._id;
      this.newReview.reviewerImg = loggedInUser.imgUrl;
      this.newReview.bedId = this.bed._id;
      this.$store
        .dispatch({ type: "addReview", review: this.newReview })
        .then(res => {
          this.newReview.txt = null;
          console.log("here", this.newReview);
        });
    }
  },
  mounted() {
    window.scrollTo(null, 0)
  },
  destroyed() {
    this.$store.dispatch({ type: "clearCurrBed" });
  },
  computed: {
    bed() {
      return JSON.parse(JSON.stringify(this.$store.getters.getCurrBed));
    },
    user() {
      return this.$store.getters.loggedInUser;
    },
    mapCenter() {
      return {
        lat: this.bed.location.coords.coordinates[1],
        lng: this.bed.location.coords.coordinates[0]
      };
    }
  },
  components: {
    bookBed,
    bedAmenities,
    photoCarusel,
    userDetails,
    chatModal
  }
};
</script>

<style  scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.img-gallery {
  display: flex;
}
.main-img {
  object-fit: cover;
  object-position: top;
  max-height: 340px;
  border: 1px solid $border-color;
  border-top: none;
  width: 50%;
}

.chat-container {
  text-align: left;
  width: fit-content;
  margin: auto;
  margin-bottom: 15px;
  .chat-btn {
    background: rgb(76, 165, 76);
    border-radius: 50%;
    padding: 4px;
    height: 33px;
    margin-right: 10px;
    border: 1.4px solid #222222;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
}

.gallery-imgs {
  max-height: 340px;
  .one-img-display {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      &:hover {
        opacity: 0.9;
        cursor: pointer;
      }
    }
  }
  .two-img-display {
    height: 100%;
    img {
      width: 100%;
      height: 50%;
      object-fit: cover;
      &:hover {
        opacity: 0.9;
        cursor: pointer;
      }
    }
  }
  .three-img-display {
    height: 100%;
    width: 100%;
    display: flex;
    div {
      width: 50%;
      img {
        height: 50%;
        width: 100%;
        object-fit: cover;
        object-position: top;
        &:hover {
          opacity: 0.9;
          cursor: pointer;
        }
      }
    }
    .img1 {
      width: 50%;
      height: 100%;
      object-fit: cover;
      &:hover {
        opacity: 0.9;
        cursor: pointer;
      }
    }
  }
  .four-img-display {
    height: 100%;
    width: 100%;
    img {
      height: 50%;
      width: 50%;
      object-fit: cover;
    }
  }
  img {
    border: 1px solid $border-color;
    border-top: none;
    &:hover {
      opacity: 0.9;
      cursor: pointer;
    }
  }
}

.map-container {
  width: 100%;
  height: 250px;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-top: 25px;
}

.booking-msg-container {
  background: lightgreen;
  height: fit-content;
  padding: 15px;
  border-radius: 15px;
  width: 100%;
  margin-top: 15px;
  margin-right: 10px;
  border: 1px solid #222222;
  color: #222222;
  transition: 0.4;
  position: absolute;
  top: 25px;
  b {
    font-size: 15px;
    font-family: $main-font-bold;
  }
  span {
    font-size: 12px;
    font-family: $main-font-light;
  }
  p {
    margin: 0;
    margin-top: 15px;
    font-size: 14px;
  }
}

.left-section {
  width: 50%;
}
//////DETAILS
.bed-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: $container;
  height: inherit;
  margin: auto;
  font-family: $main-font-bold;
}

.amenities {
  border: $border-color 1px solid;
  width: 100%;
  flex-wrap: wrap;
}

.host-img {
  height: 130px;
}

.flex-col-start {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  padding: 10px;
  text-align: start;
}

.booking-container {
  // display: flex;
  position: relative;
  margin: 15px;
  text-align: center;
  .hide-msg {
    opacity: 0;
    transition: 0.4s;
    z-index: -1;
  }
  .show-msg {
    opacity: 1;
    z-index: 5;
    transition: 0.4s;
  }
}

.details-bottom {
  display: flex;
  padding: 0 25px;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  border: 1px solid rgb(199, 199, 199);
}

.top-desc {
  padding: 10px;
  padding-bottom: 0;
  b {
    font-size: 26px;
  }
  p {
    font-size: 15px;
    font-family: $main-font-light;
    margin-bottom: 8px;
  }
  a {
    font-size: 16px;
    font-style: italic;
    font-family: $main-font-bold;
  }
}

.modal-content-details {
  flex-direction: row;
  margin: 0 auto;
  z-index: 1;
  width: 90%;
  .host-details-modal {
    background: white;
    width: 60%;
    margin: auto;
    border-radius: 10px;
    padding: 25px;
  }
  .carousel-gallery {
    height: 500px;
    .caruosel .slide {
      background: none !important;
    }
  }
}
textarea {
  height: 30px;
  width: 100%;
  margin-top: 10px;
}

.review-container {
  border: 1px solid $border-color;
  margin: 0 auto;
  margin-bottom: 10px;
  display: flex;
  text-align: left;
  padding: 5px;
  // max-width: 600px;
  width: 100%;
}

.reviews {
  width: 100%;
  font-family: $main-font-light;
  text-align: left;
  margin-top: 15px;
  & > b {
    font-family: $main-font-bold;
    font-size: 22px;
  }
  a {
    font-family: $main-font-bold;
    font-size: 14px;
    font-style: italic;
    margin-left: 10px;
  }
}

.review-preview {
  padding-left: 10px;
  padding-right: 10px;
  div {
    text-align: left;
  }
}

.review-btn {
  margin: 10px 0;
  border-radius: 5px;
  border: none;
  padding: 5px;
  background: #222222;
  color: white;
  font-family: $main-font-bold;
  letter-spacing: 1px;
}
.review-single {
  margin: 8px 0;
}

.bold {
  font-weight: bold;
}

.host-details {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  font-family: $main-font-light;
  h4 {
    text-align: left;
    font-size: 18px;
    line-height: 22px;
    b {
      font-family: $main-font-bold;
      font-size: 18px;
    }
  }
}
@media (max-width: 900px) {
  .img-gallery {
    height: 280px;
  }

  .host-details {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    font-family: $main-font-light;
    h4 {
      text-align: left;
      font-size: 16px;
      line-height: 22px;
      b {
        font-family: $main-font-bold;
        font-size: 16px;
      }
    }
  }
  .top-desc {
    padding: 10px;
    padding-bottom: 0;
    b {
      font-size: 20px;
    }
    p {
      font-size: 15px;
      font-family: $main-font-light;
      margin-bottom: 8px;
    }
    a {
      font-size: 14px;
      font-style: italic;
      font-family: $main-font-bold;
    }
  }
  .modal-content-details {
    .carousel-gallery {
      height: 350px;
    }
    .host-details-modal {
      background: white;
      width: 85%;
    }
  }
}
@media (max-width: 750px) {
  .img-gallery {
    height: 250px;
  }
}
@media (max-width: 650px) {
  .img-gallery {
    height: 235px;
  }
  .left-section {
    width: 70%;
  }
  .chat-container {
    span {
      font-size: 11px;
    }
  }
  .booking-container {
    width: 45%;
    .container {
      min-width: 160px;
    }
  }

  .details-bottom {
    padding: 0;
  }
}
@media (max-width: 550px) {
  .chat-container {
    text-align: left;
    span {
      font-size: 18px;
    }
  }
  .map-container {
    display: none;
  }
  .booking-container {
    width: 80%;
    margin: auto;
    .container {
      padding: 0;
      min-width: 160px;
    }
  }
  .left-section {
    width: 100%;
  }
  .details-bottom {
    flex-direction: column;
  }
}
</style>
