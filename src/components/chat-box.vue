<template>
  <section>
    <p v-for="msg in currChat.messages" :key="msg.timestamp">{{msg}}</p>
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
      currUser: {},
      currChat: {}
    };
  },
  created() {
    this.currUser = JSON.parse(JSON.stringify(this.$store.getters.loggedInUser))
    this.currChat = JSON.parse(JSON.stringify(this.$store.getters.getChat))
  },
  watch: {
    currChat() {
      return this.$store.getters.getChat;
    }
  },
  methods: {
    sendMsg() {
      this.currMsg.timestamp = Date.now();
      this.currMsg.from = this.currUser._id;
      this.$socket.emit('sendMsg',{ chatId: this.currChat._id, message: this.currMsg });
      this.currMsg = {
        from: '',
        txt: "",
        isRead: false,
        timestamp: Date.now()
      }
    }
  },
  sockets: {
    getMsg(msg) {
      this.currChat.messages.push(msg)
      this.$store.dispatch({ type: 'updateChat', message: msg })
    }
  }
};
</script>

<style>
</style>
