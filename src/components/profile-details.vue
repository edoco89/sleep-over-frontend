<template>
  <div v-if="user" class="user-details-container">
    <section class="top-container">
      <div class="user-card">
        <div class="top-img">
          <h4>Hi {{user.fullname}}!</h4>
          <router-link
            v-if="user._id === this.$route.params.userId"
            class="user-edit"
            href="#"
            exact
            :to="'/userEdit/' + user._id"
          >Edit profile</router-link>
        </div>
        <img :src="user.imgUrl" alt="User image">
      </div>
      <div class="calender-container">
        <div class="clndr-header">Your Stays:</div>
        <link rel="stylesheet" href="https://unpkg.com/v-calendar/lib/v-calendar.min.css">
        <link
          rel="stylesheet"
          href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css"
        >
        <v-calendar :attributes="attr" is-expanded style="width: 100%">
          <div slot="your-sleepover" slot-scope="{ customData }">
            <div class="sleepover-details">
              <b>You have a sleepOver</b>
              <a href="#" @click="showStayDetails(customData.bedId)">Go to Booking</a>
            </div>
          </div>
        </v-calendar>
      </div>
    </section>
    <div class="profile-details">
      <div>
        <b>Age:</b>
        {{user.age}}
      </div>
      <div>
        <b>Gender:</b>
        {{user.gender}}
      </div>
      <div>
        <b>About:</b>
        {{user.aboutMe}}
      </div>
      <div>
        <b>Your catch phrase:</b>
        {{user.catchPhrase}}
      </div>
      <div>
        <b>Your Interests:</b>
        <span v-for="(idx,interst) in user.interests" v-if="idx" :key="interst">{{interst + ", "}}</span>
      </div>
    </div>
  </div>
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
      currBed: null
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
            dates: stay,
            customData: stay,
            popover: {
              slot: "your-sleepover"
            }
          };
        })
      ];
    }
  },
  methods: {
    showStayDetails(id) {
      this.$router.push(`/bed/${id}`);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";
.user-details-container {
  border: 1px solid $border-color;
  border-top: none;
  font-family: $main-font-light;
  padding: 15px;
}
.profile-details {
  display: none;
}


.clndr-header {
  text-align: left;
  font-family: $main-font-bold;
  font-size: 20px;
}

.top-img {
  display: flex;
  font-family: $main-font-bold;
  a {
    padding: 0;
    border: none;
    margin-bottom: 1px;
    margin-left: 10px;
    font-style: italic;
    color: rgb(85, 143, 252);
    &:hover {
      color: rgb(85, 143, 252);
    }
  }
}

.user-card {
  margin-bottom: 10px;
  img{
    max-height: 250px;
  }
}

.sleepover-details {
  a {
    border: none;
    padding: 0;
    color: rgb(85, 143, 252);
    &:hover {
      color: rgb(85, 143, 252);
    }
  }
}
@media (min-width: 500px) {
  .user-details-container {
    padding: 30px;
  }
}
@media (min-width: 600px) {
  .user-details-container {
    padding: 15px;
  }
  .top-container {
    display: flex;
    justify-content: space-between;
  }
  .user-card {
    width: 40%;
    img {
      height: 270px;
      object-fit: cover;
      object-position: top;
    }
  }
  .clndr-header {
    margin-bottom: 5px;
  }
  .profile-details {
    display: block;
    text-align: left;
    padding: 10px 15px;
    div {
      margin-bottom: 10px;
      font-size: 18px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      b {
        font-family: $main-font-bold;
      }
    }
  }
}

@media (min-width: 1000px) {
  .user-details-container {
    padding: 10px 40px;
  }
  .calender-container {
    width: 30%;
  }
}
</style>
