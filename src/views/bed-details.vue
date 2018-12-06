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
      <div class="booking-container">
        <div class="chat-container">
          <img @click="openChat" class="chat-btn" src="@/assets/img/chat.png">
          <span class="secondary-header">{{'Chat with ' + bed.hostName}}</span>
        </div>
        <book-bed @bookRequest="bookRequest"></book-bed>
      </div>
    </div>

    <div class="reviews">
      <button @click="addReviewOpen = !addReviewOpen;">Add Review</button>
      <div class="review-add" v-if="addReviewOpen">
        <textarea v-model="newReview.txt"></textarea>
        <button @click="saveReview">Save</button>
      </div>
      <div class="flex-row review-single" v-for="review in bed.reviews" :key="review.index">
        <div class="flex-row bold user-box-review">{{review.name}}:</div>
        <div>{{review.txt}}</div>
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
  </section>
</template>
<script>
import bookBed from "@/components/book-bed.vue";
import bedAmenities from "@/components/bed-amenities.vue";
import photoCarusel from "@/components/photo-carousel.vue";
import userDetails from "@/components/userDetails.vue";

export default {
  data() {
    return {
      showModal: false,
      isDetalis: false,
      bedHost: null,
      addReviewOpen: false,
      newReview: {
        givenByName: null,
        txt: null,
        givenByUserId: null,
        bedId: null
      }
    };
  },
  created() {
    const bedId = this.$route.params.bedId;
    if (bedId) {
      this.$store.dispatch({ type: "getBedById", bedId }).then(bed => {
        console.log("bed", bed);
        this.$store
          .dispatch({ type: "getUserById", id: this.bed.hostId })
          .then(user => (this.bedHost = user));
      });
    }
  },
  methods: {
    closeModal() {
      this.showModal = false;
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
      console.log(askedDates);
    },
    openChat() {
      const loggedInUserId = this.$store.getters.loggedInUser._id;
      this.$store
        .dispatch({
          type: "getChatByIds",
          userId1: loggedInUserId,
          userId2: this.bedHost._id
        })
        .then(chat => {
          if (!chat) {
            return this.$store.dispatch({
              type: "createChatByIds",
              userId1: loggedInUserId,
              userId2: this.bedHost._id
            });
          }
          return chat;
        })
        .then(chat => {
          this.$socket.emit("chatRequest", {
            currUserId: loggedInUserId,
            userId: this.bedHost._id,
            chatId: chat._id
          });
          this.isShow = true;
          this.$router.push(`/chat/${loggedInUserId}`);
        });
    },
    saveReview() {
      this.addReviewOpen = false;
      const loggedInUser = this.$store.getters.loggedInUser;
      this.newReview.givenByName = loggedInUser.fullname;
      this.newReview.givenByUserId = loggedInUser._id;
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
    }
  },
  components: {
    bookBed,
    bedAmenities,
    photoCarusel,
    userDetails
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
      }
    }
    .img1 {
      width: 50%;
      height: 100%;
      object-fit: cover;
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

.reviews {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: $main-font-light;
  text-align: left;
  padding: 10px;
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
