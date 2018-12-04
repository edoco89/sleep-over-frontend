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
        txt: "",
        isRead: false,
        timestamp: Date.now()
      },
      currentUser: {}
    };
  },
  created() {
    this.currentUser = JSON.parse(JSON.stringify(this.$store.getters.loggedInUser))
  },
  computed: {
    chat() {
      return this.$store.getters.getChat;
    }
  },
  methods: {
    sendMsg() {
      this.currMsg.timestamp = Date.now();
      this.currMsg.from = this.currentUser._id;
      this.$store.dispatch({ type: "sendMsg", message: { ...this.currMsg } });
      this.currMsg = {
        from: '',
        txt: "",
        isRead: false,
        timestamp: Date.now()
      };
    }
  }
};
</script>

<style>
</style>
