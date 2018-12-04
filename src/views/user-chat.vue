<template>
  <section>
    <ul class="user-list">
      <li v-for="user in userChats" :key="user._id" @click="openChat(user._id)">{{user.fullname}}</li>
    </ul>
    <chat-box v-if="isShow"></chat-box>
  </section>
</template>

<script>
import chatBox from "@/components/chat-box.vue";
export default {
  data() {
    return {
      userChats: [],
      currUser: {},
      currUserChat: {},
      isShow: false
    };
  },
  created() {
    this.currUser = JSON.parse(
      JSON.stringify(this.$store.getters.loggedInUser)
    );
    this.$store
      .dispatch({ type: "getChatsById", userId: this.currUser._id })
      .then(users => (this.userChats = users));
  },
  methods: {
    openChat(userId) {
      this.$store
        .dispatch({
          type: "getChatByIds",
          userId1: this.currUser._id,
          userId2: userId
        })
        .then(() => (this.isShow = true));
    }
  },
  components: {
    chatBox
  }
};
</script>

<style>
.user-list {
  width: 90%;
  margin: auto;
}
</style>
