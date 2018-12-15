<template>
  <section class="user-details-container">
    <section v-if="user" class="user-card">
      <img :src="user.imgUrl" alt="User image">
      <div class="more-details">
        <router-link
          v-if="user._id === this.$route.params.userId"
          class="user-edit"
          href="#"
          exact
          :to="'/userEdit/' + user._id"
        >Edit profile</router-link>
        <div class="user-details">
          <h4>{{user.fullname}}</h4>
          <div v-if="user.hostBadge">
            <p>{{user.hostBadge}}</p>
          </div>
          <div v-if="user.age">
            Age:
            <span>{{user.age}}</span>
          </div>
          <div v-if="user.gender">
            Gender:
            <span>{{user.gender}}</span>
          </div>
        </div>
      </div>
    </section>
    <div class="calender-container">
      <link rel="stylesheet" href="https://unpkg.com/v-calendar/lib/v-calendar.min.css">
      <link
        rel="stylesheet"
        href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css"
      >
      <v-calendar :attributes="attr" is-expanded style="width: 100%">
        <div slot="confirm-stay" slot-scope="{ customData }" class="confirm-stay">
          <div>
            <p>You have a sleepOver</p>
            <a href="#" @click="showUserDetails(customData.hostId)">More on {{customData.name}}</a>
          </div>
        </div>
      </v-calendar>
    </div>
  </section>
</template>

<script>
import userDetails from "@/components/userDetails.vue";
export default {
  props: {
    user: Object,
    default: {}
  },
  data() {
    return {
      showModal: false,
      currUser: null
    };
  },
  computed: {
    attr() {
      if (!this.user) return;
      return [
          ...this.user.stays.map((stay, idx) => {
            return {
              highlight: {
                backgroundColor: "#7CC75E"
              },
              contentStyle: {
                color: "#fafafa"
              },
              themeStyles: {
                wrapper: {
                  height: "50%"
                }
              },
              dates: stay,
              customData: stay,
              popover: {
                slot: "confirm-stay"
              }
            }
          })
        ];
    }
  },
methods: {
    showUserDetails(id) {
      this.$store.dispatch({ type: "getUserById", id }).then(gotUser => {
        this.currUser = { ...gotUser };
        this.isDetails = true;
        this.showModal = true;
      });
    }
}
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.user-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    // height: 250px;
    object-fit: cover;
    object-position: top;
  }
  div {
    // margin: 8px;
  }
  .user-details {
    text-align: left;
    // padding: 10px;
    margin-left: 15px;
    margin-top: 0px;
  }
}
.calender-container {
  width: 100%;
  margin: 0;
}

.user-details-container {
  padding-top: 0;
  border: 1px solid $border-color;
  // border-top: none;
  // margin: auto;
  width: 100%;
  h4 {
    font-family: $main-font-bold;
    font-size: 17px;
  }
  div {
    font-family: $main-font-bold;
    font-size: 12px;
    margin-bottom: 8px;
    span {
      font-family: $main-font-light;
      font-size: 12px;
    }
  }
}

.tabs a {
  border: none;
  padding: 0;
  color: rgb(85, 143, 252);
  margin-top: 8px;
  &:hover {
    color: rgb(85, 143, 252);
  }
}
.more-details {
  text-align: left;
  a {
    font-family: $main-font-bold;
    font-style: italic;
    font-size: 10px;
    margin-left: 15px;
    margin-bottom: 8px;
    width: fit-content;
  }
  div {
    h5 {
      margin-top: 10px;
      font-size: 14px;
      margin-bottom: 0;
      font-family: $main-font-bold;
      span {
        font-size: 5px;
        margin-bottom: 10px;
      }
    }
  }
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
  // border: 1px solid #947e7e;
  position: relative;
  color: #222222;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  text-align: left;
  height: 250px;
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
  border-top: none;
  b {
    font-family: $main-font-bold;
  }
  padding-top: 10px;
}

@media (min-width: 500px) {
  .user-details-container {
    display: flex;
    height: 300px;
    .calender-container {
      margin-left: 10px;
    }
  }
  .user-card {
    height: 265px;
    img {
      height: 150px;
    }
  }
}
@media (min-width: 600px) {
  .user-details-container {
    display: flex;
    height: 500px;
  }
  .user-card {
    height: fit-content;
    img {
      height: 273px;
    }
  }
  .more-details {
    text-align: left;
    width: 100%;
    height: 100%;
    a {
      font-family: $main-font-bold;
      font-style: italic;
      font-size: 14px;
      margin-left: 15px;
      margin-bottom: 8px;
      width: fit-content;
    }
    h4 {
      margin-top: 5px;
      font-size: 20px;
      margin-bottom: 8px;
      font-family: $main-font-bold;
      .user-details {
        div {
          font-size: 25px;
          margin-bottom: 10px;
        }
      }
    }
  }
  .user-details-container {
    div {
      font-size: 15px;
      span {
        font-size: 15px;
      }
    }
  }
  .calender-container {
    height: fit-content;
  }
}
@media (min-width: 800px) {
  .calender-container {
    height: fit-content;
    width: 80%;
  }

  .user-card {
    // height: 100%;
    display: flex;
    flex-direction: column;
    img {
      width: 80%;
      // height: 250px;
      object-fit: cover;
      object-position: top;
    }
    div {
      // margin: 8px;
    }
    .user-details {
      text-align: left;
      // padding: 10px;
      margin-left: 15px;
      margin-top: 0px;
    }
  }
}

@media (min-width: 1000px) {
  .calender-container {
    height: fit-content;
    width: 50%;
    padding-right:20px;
  }

  .user-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    img {
      width: 60%;
      // height: 250px;
      object-fit: cover;
      object-position: top;
    }
    div {
      // margin: 8px;
    }
    .user-details {
      text-align: left;
      // padding: 10px;
      margin-left: 15px;
      margin-top: 0px;
    }
  }
}
</style>
