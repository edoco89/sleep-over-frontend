<template>
<<<<<<< HEAD
  <section class="profile-container" v-if="user">
    <user-details :user="user" v-if="user"></user-details>
=======
  <section v-if="user">
    <section class="main-grid">
      <div class="pic-box mild-border">
        <img class="single-img" :src="user.imgUrl">
      </div>
      <div class="dashboard">
        <span>Dashboard</span>
        <br>
        <!-- <span>{{user.hostBadge}}</span> -->

      <span>42 Reviews</span>
        <!-- <router-link v-if="user._id===loggedInUser._id" class="user-edit" tag="button" exact :to="'/userEdit/' + user._id">Edit</router-link>--> -->
        <!-- <span>42 Reviews</span>-->
        <router-link class="user-edit" tag="button" exact :to="'/userEdit/' + user._id">Edit Profile</router-link> 
      
      </div>
      <div class="about-me-box">
        <b>{{user.fullname}}</b>
        <!-- <p v-if="user.hostBeds[0].location.address">{{user.hostBeds[0].location.address}}</p> -->
        <ul v-if="user.hobbies">
          <li v-for="(hobbie,idx) in user.hobbies" :key="idx">{{hobbie}}</li>
        </ul>
        <b v-if="user.fullname">{{user.fullname}}</b>
        <p v-if="user.hostBadge">{{user.hostBadge}}</p>
        <b v-if="user.age">{{user.age}}</b>
        <b v-if="user.gender">{{user.gender}}</b>
        <p v-if="user.aboutMe">{{user.aboutMe}}</p>
        <p v-if="user.languages[0]">{{user.languages.join(' ,')}}</p>
      </div>
    </section>
>>>>>>> cf587db50335182f531322629809407d8963baf8

    <div class="bed-list">
      <span>Your Beds</span>
      <router-link to="/addBed" href="#">Add Bed</router-link>
      <div v-for="bed in user.hostBeds" :key="bed._id" class="user-bed">
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
            <button v-if="bed.reviews.length > 0" @click="showReview">Bed Reviews</button>
          </div>
        </div>
        <photo-carusel class="user-photo-carusel" :pics="bed.imgUrls"></photo-carusel>
      </div>
    </div>

    <div :class="{'is-active' : showModal}" class="modal">
      <div @click="showModal = false" class="modal-background"></div>
      <div class="modal-content">
        <ul>
          <li v-for="(review,idx) in user.reviews" :key="idx">{{review}}</li>
        </ul>
      </div>
      <button @click="showModal = false" class="modal-close is-large" aria-label="close"></button>
    </div>
  </section>
</template>

<script>
import photoCarusel from "@/components/photo-carousel.vue";
import bedAmenities from "@/components/bed-amenities.vue";
import addBed from "@/components/add-bed.vue";
import chatBox from "@/components/chat-box.vue";
import userDetails from "@/components/userDetails.vue";

export default {
  computed: {
    user() {
      return this.$store.getters.loggedInUser;
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
    addBed,
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
