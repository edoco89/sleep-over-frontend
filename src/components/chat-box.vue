<template>
  <section>
    <p v-for="msg in chat.messages" :key="msg.timestamp">{{msg}}</p>
    <input type="text" v-model="currMsg.txt">
    <button @click="sendMsg">SEND</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currMsg: {
        from: "",
        to: "",
        txt: "",
        timestamp: Date.now()
      },
      currentUser: {}
    };
  },
  created() {
    this.currentUser = {...this.$store.getters.loggedInUser}
    this.$store.dispatch({ type: "getChatById", chatId: this.currentUser.chatHistory[0] });
  },
  computed: {
    chat() {
      return this.$store.getters.getChat;
    }
  },
  methods: {
    sendMsg() {
      this.currMsg.timestamp = Date.now();
      this.$store.dispatch({ type: "sendMsg", message: { ...this.currMsg } });
      this.currMsg = {
        from: "",
        to: "",
        txt: "",
        timestamp: Date.now()
      };
    }
  }
};
</script>

<style>
</style>
