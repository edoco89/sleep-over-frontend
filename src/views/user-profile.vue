<template>
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

    <div class="bed-list">
      <span>Your Beds</span>
      <router-link to="/addBed" href="#">Add Bed</router-link>
      <!-- v-for="bed in user.beds" -->
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
            <button v-if="bed.reviews[0]" @click="showReview">Bed Reviews</button>
          </div>
        </div>
        <photo-carusel class="user-photo-carusel" :pics="bed.imgUrls"></photo-carusel>
      </div>
    </div>

    <!-- <div :class="{'is-active' : showModal}" class="modal">
      <div @click="closeModal" class="modal-background"></div>
      <div class="modal-content">
        <ul>
          <li v-for="(review,idx) in user.reviews" :key="idx">{{review}}</li>
        </ul>
      </div>
      <button @click="closeModal" class="modal-close is-large" aria-label="close"></button>
    </div>-->
  </section>
</template>

<script>
import photoCarusel from "@/components/photo-carousel.vue";
import bedAmenities from "@/components/bed-amenities.vue";
import addBed from "@/components/add-bed.vue";
import chatBox from "@/components/chat-box.vue";

export default {
  computed: {
    user() {
      return this.$store.getters.loggedInUser;
    }
  },
  components: {
    photoCarusel,
    bedAmenities,
    addBed,
    chatBox
  }
};
//   methods: {
//     openAddBed() {}
//   },
//   data() {
//     return {
//       showModal: false,
//       bed: {
//         numberOfVisits: 43,
//         type: "bed",
//         location: {
//           city: "Berlin",
//           country: "Germany"
//         },
//         imgUrls: [
//           "http://49cpdx1eot3t404114d6kgn480-wpengine.netdna-ssl.com/uae/wp-content/uploads/sites/15/2015/05/couchsurfing-2-.jpg",
//           "https://pmcdeadline2.files.wordpress.com/2013/07/amyacker__130721002642.jpg"
//         ],
//         ameneties: {
//           accessibility: true,
//           wifi: true,
//           acceptsPets: true,
//           airConditioner: true,
//           shampoo: true,
//           parking: true,
//           children: true
//         }
//       }
//     };
//   },

// };
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.main-grid {
  width: $container;
  margin: auto;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 100px 150px 150px;
  color: $text-color-cards;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: $main-font-bold;
}

.pic-box {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: -1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
}

.dashboard {
  grid-column-start: 3;
  grid-column-end: -1;
  grid-row-start: 1;
  grid-row-end: 2;
  background-color: $bg-color;
  border-radius: 4px;
}

.bed-list {
  width: $container;
  margin: auto;
  text-align: left;
  span {
    font-size: 25px;
    margin-right: 15px;
  }
}

.user-bed {
  display: flex;
  text-align: left;
  height: 250px;
  .user-photo-carusel {
    width: 50%;
    height: 100%;
  }
  .bed-details {
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
