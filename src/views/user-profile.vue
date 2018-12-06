<template>
  <section class="profile-container" v-if="user">
    <user-details :user="user" v-if="user"></user-details>

    <div class="bed-list">
      <span>Your Beds</span>
      <router-link to="/bedEdit" href="#">Add Bed</router-link>
      <div v-if="bed" v-for="bed in user.hostBeds" :key="bed._id" class="user-bed">
        <div class="bed-details">
          <b>Your {{bed.type}} In {{bed.location.address}}</b>
          <div>
            <img src="@/assets/img/star.png">
            <span>{{bed.rating}}</span>
          </div>
          <div v-if="bed.ameneties">
            <bed-amenities :details="bed.ameneties"></bed-amenities>
          </div>
          <div>
            <button v-if="bed.reviews" @click="showModal = true">Bed Reviews</button>
          </div>
          <router-link :to="'/bedEdit/' + bed._id" href="#">Edit Bed</router-link>
        </div>
        <photo-carusel class="user-photo-carusel" :pics="bed.imgUrls"></photo-carusel>
      </div>
    </div>

    <div :class="{'is-active' : showModal}" class="modal">
      <div @click="showModal = false" class="modal-background"></div>
      <div class="modal-content">
        <ul v-if="user.reviews.length > 0">
          <li v-for="(review,idx) in user.reviews" :key="idx">{{review}}</li>
        </ul>
        <div v-else>NO Reviews</div>
      </div>
      <button @click="showModal = false" class="modal-close is-large" aria-label="close"></button>
    </div>
  </section>
</template>

<script>
import photoCarusel from "@/components/photo-carousel.vue";
import bedAmenities from "@/components/bed-amenities.vue";
import chatBox from "@/components/chat-box.vue";
import userDetails from "@/components/userDetails.vue";

export default {
  computed: {
    user() {
      return JSON.parse(JSON.stringify(this.$store.getters.loggedInUser));
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  components: {
    photoCarusel,
    bedAmenities,
    chatBox,
    userDetails
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";
.profile-container {
  // border: 1px solid $border-color;
  // border-top: none;
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
  border: 1px solid $border-color;
  margin-top: 10px;
  display: flex;
  text-align: left;
  height: 250px;
  .user-photo-carusel {
    width: 50%;
    height: 100%;
    padding: 10px;
    margin: 5px;
  }
  .bed-details {
    padding: 10px;
    margin: 5px;
    width: 50%;
    height: 100%;
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

@media (min-width: 550px) {
  .main-grid {
    // grid-template-rows: 200px 200px;
  }
}
@media (min-width: 700px) {
  .main-grid {
    // grid-template-rows: 200px 200px;
  }
}
</style>
