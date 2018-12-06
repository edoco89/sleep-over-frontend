<template>
  <section v-if="bed" class="bed-details">
    <div class="img-gallery">
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
      <div>
        <div class="flex-col-start">
          <h5 class="minor-header">{{bed.type}}</h5>
          <h2 class="summary-standout">
            {{bed.hostName+ ' ' + bed.type}} in
            {{bed.location.address}}
          </h2>
          <a href="#" class="secondary-header" @click="openDetails">{{'More on ' + bed.hostName}}</a>
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
      <div v-if="!isBook" class="booking-container">
        <div class="chat-container">
          <a @click="openChat">
            <img class="chat-btn" src="@/assets/img/chat.png">
          </a>
          <span class="secondary-header">{{'Chat with ' + bed.hostName}}</span>
        </div>
        <book-bed @bookRequest="bookRequest"></book-bed>
      </div>
      <div v-if="isBook" class="booking-container">
        <p>Your request is has submitted for a
          <span>SleepOver</span>
          at {{bedHost.fullname}}'s {{bed.type}}
        </p>
        <p>
          In {{bed.location.address}} from {{askedBookDates.start.getMonth()+1}}/{{askedBookDates.start.getDate()}}/{{askedBookDates.start.getFullYear()}} until
          {{askedBookDates.end.getMonth()+1}}/{{askedBookDates.end.getDate()}}/{{askedBookDates.end.getFullYear()}}
        </p>
        <p>The host will send you a message for approval</p>
      </div>
    </div>

    <div class="reviews">
      <button @click="addReviewOpen = !addReviewOpen;" class="review-btn">Add Review</button>
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

    <!-- photo gallery modal -->
    <div :class="{'is-active' : showModal}" class="modal">
      <div @click="closeModal" class="modal-background"></div>
      <div class="modal-content-details">
        <user-details class="host-details-modal" :user="bedHost" v-if="isDetalis"></user-details>
        <photo-carusel v-else :pics="bed.imgUrls"></photo-carusel>
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
      askedBookDates: null,
      showChatModal: false
    };
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
      this.askedBookDates = { ...askedDates };
      this.isBook = true;
      const loggedInUser = JSON.parse(JSON.stringify(this.$store.getters.loggedInUser));
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
          this.$store.dispatch({
            type: "getChatsById",
            userId: loggedInUser._id
          });
          this.$socket.emit("chatRequest", {
            currUserId: loggedInUser._id,
            userId: this.bedHost._id,
            chatId: chat._id
          });
          return chat._id;
        })
        .then( (chatId) => {
          let msg = {
        from: loggedInUser._id,
        txt: `${loggedInUser.fullname} submited a request for a sleepover at your place
        between ${this.askedBookDates.start.getMonth()+1}/${this.askedBookDates.end.getDate()}/${this.askedBookDates.start.getFullYear()} to ${this.askedBookDates.start.getMonth()+1}/${this.askedBookDates.end.getDate()}/${this.askedBookDates.end.getFullYear()}
        Send a message to aprove`,
        isRead: false,
        timestamp: Date.now()
          }
      this.$socket.emit("sendMsg", {
        chatId,
        message: msg,
        userId: this.bedHost._id
      });
        })
    },
    openChat() {
      const loggedInUser = JSON.parse(JSON.stringify(this.$store.getters.loggedInUser));
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
  destroyed() {
    this.$store.dispatch({ type: "clearCurrBed" });
  },
  computed: {
    bed() {
      return JSON.parse(JSON.stringify(this.$store.getters.getCurrBed));
    },
    user() {
      return this.$store.getters.loggedInUser;
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
  // min-height: 340px;
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

h4 {
  text-align: left;
  font-size: 17px;
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
  margin: 15px;
  text-align: center;
}

.details-bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid rgb(199, 199, 199);
}

.modal-content-details {
  flex-direction: row;
  margin: 0 auto;
  z-index: 1;
  .host-details-modal {
    background: white;
    width: 90%;
    margin: auto;
    border-radius: 10px;
    padding: 25px;
  }
}
textarea {
  height: 30px;
  width: 100%;
  margin-top: 10px;
}

.review-container {
  border: 1px solid $border-color;
  margin-bottom: 10px;
  display: flex;
  text-align: left;
  padding: 5px;
}

.reviews {
  justify-content: space-between;
  width: 100%;
  font-family: $main-font-light;
  text-align: left;
}

.review-preview {
  padding-left: 10px;
  padding-right: 10px;
  div {
    text-align: left;
  }
}

.review-btn{
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
}
@media (max-width: 900px) {
  .img-gallery {
    height: 280px;
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
}
</style>
