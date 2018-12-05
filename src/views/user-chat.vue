<template>
  <section>
    <ul v-for="user in userChats" :key="user._id" class="user-list">
      {{userChats}}
      <li @click="openChat(user._id)">{{user.fullname}}</li>
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
      isShow: false
    };
  },
  created() {
    this.currUser = JSON.parse(JSON.stringify(this.$store.getters.loggedInUser));
    this.$store.dispatch({ type: "getChatsById", userId: this.currUser._id })
      .then(users => this.userChats = users);
  },
  methods: {
    openChat(userId) {
      this.$store.dispatch({type: "getChatByIds",userId1: this.currUser._id, userId2: userId})
        .then(chat => {
          this.$socket.emit('chatRequest', { currUserId: this.currUser._id, userId, chatId: chat._id});
          this.isShow = true;
        })
    }
  },
    mounted() {
     this.$store.dispatch({ type: "getChatsById", userId: this.currUser._id })
      .then(users => this.userChats = users);
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
