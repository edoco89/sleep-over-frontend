<template>
  <section class="main-grid">
   
    <div class="pic-box mild-border">
      <img class="single-img" :src="user.imgUrl">
      <b>{{user.fullname}}</b>
      <p>{{bed.location.city}}, {{bed.location.country}}</p>
      <p></p>
    </div>

    <div class="dashboard">
      <span>Dashboard</span>
      <br>
      <span>{{user.hostBadge}}</span> |
      <span>42 Reviews</span>
      <router-link
        class="user-edit"
        tag="button"
        exact :to="'/userEdit/' + user._id"
      >Edit</router-link>

      <!-- temporary - calculate num of reviewes  -->
    </div>

    <div class="bed-box">
      Your {{bed.type}} In {{bed.location.city}}
      <!-- <img class="bed-img" :src="bed.imgUrls[0]"> -->
     
       <photo-carusel class="user-photo-carusel" :pics="bed.imgUrls"></photo-carusel>
       <br>
      <b>Home Amenities:</b>
          <bed-amenities :details="bed.ameneties"></bed-amenities>
    </div>

    <div class="about-me-box">
        <!-- <input type="number" v-model="user.age" placeholder="User age"> -->
    
      <!-- <input v-model="user.age">{{user.age}}</b> -->
      <div class="select">
  <select v-model="user.gender" value="user.gender">
    <option>Male</option>
    <option>Female</option>
  </select>
</div>
      <select>{{user.gender}}</select>

      <button @click="saveUser"> Save Changes </button>
      <ul>
        <li v-for="(hobbie,idx) in user.hobbies" :key="idx">{{hobbie}}</li>
      </ul>
      <p>{{user.languages.join(' ,')}}</p>
    </div>

    <div class="community-box">
      Suggested Content
      Meet our community
      Some stuff
    </div>
    <div class="review-box">
      {{user}}
      <ul>
        <li v-for="(review,idx) in user.reviews" :key="idx">{{review}}</li>
      </ul>
      <!-- "hostBedsId": ["5bffe487001936be312de7d8"], -->
    </div>
  </section>
</template>

<script>
import photoCarusel from "@/components/photo-carousel.vue";
import bedAmenities from "@/components/bed-amenities.vue";

export default {
  created() {
    const userId = this.$route.params.userId;
    if (userId) {
      this.$store.dispatch({ type: "getUserById", userId })
    }
  },
    computed: {
    user() {
      return this.$store.getters.loggedInUser;
    },
    
  },
  
  methods: {
saveUser() {
  console.log('save user func' , this.user)
     if (this.user.age) {
                this.$store.dispatch({type: 'saveUser', todo: this.user})
                    .then(_=> {
                        // this.$router.push('/userProfile')                      
                    })
                    // .catch(_=> {
                    //     EventBusService.$emit(SHOW_MSG, {txt: 'Could not save Todo', type: 'danger'})
                    // })
            } else {
                EventBusService.$emit(SHOW_MSG, {txt: 'No user to save!', type: 'danger'})
            }
}
  },
  data() {
    return {
      bed: {
        numberOfVisits: 43,
        type: "bed",
        location: {
          city: "Berlin",
          country: "Germany"
        },
        imgUrls: [
          "http://49cpdx1eot3t404114d6kgn480-wpengine.netdna-ssl.com/uae/wp-content/uploads/sites/15/2015/05/couchsurfing-2-.jpg",
          "https://pmcdeadline2.files.wordpress.com/2013/07/amyacker__130721002642.jpg"
        ],
        ameneties: {
            "accessibility": true,
            "wifi": true,
            "acceptsPets": true,
            "airConditioner": true,
            "shampoo": true,
            "parking": true,
            "children": true
        }
      }
    };
  },
  components: {
    photoCarusel,
    bedAmenities
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

section {
  width: $container;
  margin: auto;
  display: grid;
  grid-gap: 5px;
  // grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: 55px / auto auto auto;
  color: $text-color-cards;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: $main-font-bold;
}

.pic-box {
  grid-column: 1;
  grid-row: 1 / span 2;
}

.dashboard {
  grid-column: 1;
  grid-row: 3;
  background-color: $bg-color;
  border-radius: 4px;
}

.bed-box {
  grid-column: 1;
  grid-row: 4;
  background-color: rgb(231, 225, 225);
  display: flex;
  flex-direction: column;
}

.about-me-box {
  grid-column: 1;
  grid-row: 5;
  background-color: rgb(202, 238, 202);
}

.community-box {
  grid-column: 1;
  grid-row: 6;
  background-color:beige;
}

.review-box {
  grid-column: 1;
  grid-row:7;
  background-color: rgb(243, 212, 218);
}

.user-photo-carusel {
  height: 100%;
  width: 100%;
}

@media (min-width: 550px) {
  .main-grid {
    grid-template-rows: 85px 85px 85px 85px 170px;
  }
}
@media (min-width: 700px) {
  section {
    grid-template-rows: 55px 55px 55px 55px 110px;
     grid-template-columns: repeat(3, 1fr);
  }

  .main-grid {
    grid-template-rows: 100px 100px 100px 100px 200px;
  }

  .main-grid > * {
    margin: 5px 0;
  }

.pic-box {
  grid-column: 1;
  grid-row: 1 / span 2;
}

.dashboard {
  grid-column: 2 / span 2;
  grid-row: 1;
  background-color: $bg-color;
  border-radius: 4px;
}

.bed-box {
  grid-column: 2 / span 2;
  grid-row: 2 / span 4;
  background-color: rgb(233, 233, 184);
}

.about-me-box {
  grid-column: 2 / span 2;
  grid-row: 6 / span 2;
  background-color: rgb(202, 238, 202);
}

.community-box {
  grid-column: 1;
  grid-row: 3 / span 2;
  background-color: rgb(200, 234, 245);
}

.review-box {
  grid-column: 1 / span 3;
  grid-row: 6 / span 2;
  background-color: rgb(243, 212, 218);
}

 
}
@media (min-width: 1050px) {
  section {
    grid-template-rows: 55px 55px 55px 55px 110px;
     grid-template-columns: repeat(4, 1fr);
  }

  .main-grid {
    grid-template-rows: 100px 100px 100px 100px 200px;
  }

.pic-box {
  grid-column: 1;
  grid-row: 1 / span 2;
}

.dashboard {
  grid-column: 2 / span 3;
  grid-row: 1;
  background-color: $bg-color;
  border-radius: 4px;
}

.bed-box {
  grid-column: 2 / span 2;
  grid-row: 2 / span 2;
  background-color: rgb(233, 233, 184);
}

.about-me-box {
  grid-column: 2 / span 2;
  grid-row: 4 / span 2;
  background-color: rgb(202, 238, 202);
}

.community-box {
  grid-column: 4;
  grid-row: 2 / span 3;
  background-color: rgb(200, 234, 245);
}

.review-box {
  grid-column: 2 / span 3;
  grid-row: 5 / span 2;
  background-color: rgb(243, 212, 218);
}
  
}
</style>
