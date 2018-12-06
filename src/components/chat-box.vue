<template>
  <section class="chat-container">
    <div
      v-for="msg in currChat.messages"
      :key="msg.timestamp"
      :class="(msg.from === currUser._id )? 'my-msg':'his-msg'">
      <p>{{msg.txt}}</p>
    </div>
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
    };
  },
  computed: {
    currChat() {
      return JSON.parse(JSON.stringify(this.$store.getters.getChat));
    },
    currUser() {
      return JSON.parse(JSON.stringify(this.$store.getters.loggedInUser));
    }
  },
  methods: {
    sendMsg() {
      this.currMsg.timestamp = Date.now();
      this.currMsg.from = this.currUser._id;
      this.$socket.emit("sendMsg", {
        chatId: this.currChat._id,
        message: this.currMsg
      });
      this.currMsg = {
        from: "",
        txt: "",
        isRead: false,
        timestamp: Date.now()
      };
    }
  },
  sockets: {
    getMsg(msg) {
      this.currChat.messages.push(msg);
      this.$store.dispatch({ type: "updateChat", message: msg });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.chat-container {
  // background: gray;
  width: 80%;
  height: 100%;
  position: relative;
  font-family: $main-font-light;
  input {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 5px;
  }
  p {
    text-align: left;
    color: black;
    margin-left: 10px;
    margin-top: 10px;
  }
  button {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 5px;
  }
  .my-msg {
    p {
      background: lightgray;
      width: fit-content;
      padding: 12px;
      border-radius: 8px;
    }
  }
  .his-msg {
    text-align: -webkit-right;
    p {
      background: lightblue;
      width: fit-content;
      margin-right: 10px;
      padding: 12px;
      border-radius: 8px;
    }
  }
}
</style>
