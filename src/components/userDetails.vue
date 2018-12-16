<template>
  <section class="user-details-container">
    <section v-if="user" class="user-card">
      <img :src="user.imgUrl" alt="User image">
      <div class="user-details">
        <h4>{{user.fullname}}</h4>
        <div class="chat-container">
          <a>
            <img class="chat-btn" src="@/assets/img/chat.png">
          </a>
          <span class="secondary-header">{{'Chat with ' + user.fullname}}</span>
        </div>
        <div v-if="user.age">
          Age:
          <span>{{user.age}}</span>
        </div>
        <div v-if="user.gender">
          Gender:
          <span>{{user.gender}}</span>
        </div>
        <div v-if="user.languages.length > 0">
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
      <div v-if="user.interests">
        <h5>Interests:</h5>
        <span v-for="(interest,idx) in user.interests" :key="idx">{{(interest)? idx + ", ": ""}}</span>
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
  padding-top: 10px;
  height: 100%;
  display: flex;
  img {
    width: 50%;
    height: 250px;
    object-fit: cover;
    object-position: top;
  }
  div {
    // margin: 8px;
  }
  .user-details {
    text-align: left;
    margin-left: 15px;
    // padding: 10px;
    // margin-top: 0px;
  }
}

.chat-container {
  // text-align: left;
  // width: fit-content;
  // margin: auto;
  // margin-bottom: 15px;
  display: flex;
  align-items: center;
  a {
    border: none;
    padding: 0;
  }
  .secondary-header {
    font-family: $main-font-bold;
    margin-left: 5px;
  }
  .chat-btn {
    background: rgb(76, 165, 76);
    border-radius: 50%;
    padding: 5px;
    height: 25px;
    width: 25px;
    border: none;
    border: 1.4px solid #222222;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
}

.user-details-container {
  padding-top: 0;
  border: 1px solid $border-color;
  border-top: none;
  h4 {
    font-family: $main-font-bold;
    font-size: 18px;
  }
  div {
    font-family: $main-font-bold;
    font-size: 16px;
    margin-bottom: 8px;
    span {
      font-family: $main-font-light;
      font-size: 14px;
    }
  }
}

.more-details {
  text-align: left;
  padding: 0 10px;
  margin: 0 auto;
  margin-top: 15px;
  a {
    font-family: $main-font-bold;
    font-style: italic;
    font-size: 15px;
  }
  h5 {
    margin-top: 10px;
    margin-bottom: 0;
    font-family: $main-font-bold;
  }
  div {
    margin-bottom: 10px;
  }
}

@media (max-width: 600px) {
  .user-card {
    padding-top: 10px;
    height: 100%;
    display: flex;
    font-size: 12px;
    img {
      width: 40%;
      height: 160px;
      object-fit: cover;
      object-position: top;
    }
    .user-details {
      text-align: left;
      margin-left: 15px;
      width: 50%;
    }
  }
  .user-details-container {
    padding-top: 0;
    border: 1px solid $border-color;
    border-top: none;
    h4 {
      font-family: $main-font-bold;
      font-size: 15px;
    }
    h5 {
      font-size: 15px;
    }
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: $main-font-bold;
      font-size: 12px;
      margin-bottom: 8px;
      span {
        font-family: $main-font-light;
        font-size: 12px;
      }
    }
  }

  .chat-container {
    padding: 5px;
    .secondary-header {
      font-family: $main-font-bold;
      margin-left: 5px;
      font-size: 10px;
    }
    .chat-btn {
      background: rgb(76, 165, 76);
      border-radius: 50%;
      height: 25px;
      width: 25px;
      border: none;
      border: 1.4px solid #222222;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
}
</style>;
