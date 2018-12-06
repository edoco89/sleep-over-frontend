<template>
  <section class="chat-frame-container">
    <section class="chat-container">
      <div
        v-for="msg in currChat.messages"
        :key="msg.timestamp"
        :class="(msg.from === currUser._id )? 'my-msg':'his-msg'"
      >
        <p>{{msg.txt}}</p>
      </div>
    </section>
    <div class="msg-input">
      <input type="text" v-model="currMsg.txt">
      <button @click="sendMsg">SEND</button>
    </div>
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
        message: this.currMsg,
        userId: this.currUser._id
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
  // position: relative;
  position: absolute;
  right: 0;
  width: 70%;
  height: 100%;
  font-family: $main-font-light;
  p {
    text-align: left;
    color: black;
    margin-left: 10px;
    // margin-top: 2px;
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
  p:last-child {
    margin-bottom: 50px;
  }
}

.chat-frame-container {
  width: 65%;
  margin-top: 100px;
  z-index: 1;
  overflow: hidden;
  .msg-input {
    position: absolute;
    display: flex;
    bottom: 35px;
    right: 7%;
    width: inherit;
    button {
      position: fixed;
      border-radius: 5px;
      border: 1px solid grey;
      margin-left: 3px;
      padding: 5px;
    }
    input {
      position: fixed;
      width: 60%;
      padding: 5px;
      margin-left: 58px;
    }
  }
}
</style>
