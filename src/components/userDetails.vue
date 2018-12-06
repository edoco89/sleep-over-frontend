<template>
  <section class="user-details-container">
    <section v-if="user" class="user-card">
      <img :src="user.imgUrl" alt="User image">
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
        <div v-if="user.languages">
          Languges:
          <span>{{user.languages.join(' ,')}}</span>
        </div>
      </div>
    </section>
    <div class="more-details">
      <router-link
        v-if="user._id === this.$route.params.userId"
        class="user-edit"
        exact
        :to="'/userEdit/' + user._id"
      >Edit profile</router-link>
      <div v-if="user.aboutMe">
        <h5>About:</h5>
        <span>{{user.aboutMe}}</span>
      </div>
      <div v-if="user.hobbies">
        <h5>Hobbies:</h5>
        <span v-for="(hobbie,idx) in user.hobbies" :key="idx">{{idx+ ", "}}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    user: Object,
    default: {}
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";
.user-card {
  // width: 90%;
  // padding: 10px;
  height: 100%;
  display: flex;
  img {
    width: 50%;
    height: 200px;
    object-fit: cover;
    object-position: top;
  }
  div {
    margin: 8px;
  }
  .user-details {
    text-align: left;
    padding: 10px;
    margin-left: 15px;
    margin-top: 0px;
  }
}

.user-details-container {
  padding-top: 0;
  border: 1px solid $border-color;
  border-top: none;
}

.more-details {
  text-align: left;
  padding: 0 10px;

  // width: 90%;
  margin: 25px auto;
  h5 {
    margin-bottom: 0;
  }
  div {
    margin-bottom: 10px;
  }
}

</style>;
