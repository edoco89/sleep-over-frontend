<template>
  <section class="chat-frame-container">
    <section class="chat-container">
      <div
        v-for="msg in currChat.messages"
        :key="msg.timestamp"
        :class="(msg.from === currUser._id )? 'my-msg':'his-msg'"
        >
        <p :class="(msg.img)? 'book-approve':''">
          {{msg.txt}}
          <img v-if="msg.img" src="@/assets/img/key.png">
        </p>
      </div>
    </section>
    <div class="msg-input">
      <input
        @focus="$emit('clearNotification', currChat.usersId.find(id => currUser._id !== id), currChat._id)"
        @keypress="isEnterDown"
        type="text"
        v-model="currMsg.txt"
      >
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
      }
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
    },
    isEnterDown(ev) {
      if (ev.code === "Enter") this.sendMsg();
    }
  },
  mounted() {
    this.$emit('mounted')
    //window.scrollTo(null, 0)
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.chat-container {
  // background: gray;
  // position: relative;
  position: absolute;
  left: 2px;
  width: 100%;
  height: 100%;
  font-family: $main-font-light;
  p {
    text-align: left;
    color: black;
    margin-left: 10px;

    img {
      width: 50px;
      margin-left: 15px;
      padding: 5px;
    }
  }
  .my-msg {
    text-align: -webkit-right;
    p {
      background: lightgray;
      width: fit-content;
      padding: 12px;
      border-radius: 8px;
    }
  }
  .his-msg {
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
  .book-approve {
    font-family: $main-font-bold;
    text-align: center;
    font-size: 20px;
    background: yellowgreen !important;
  }
}

.chat-frame-container {
  width: 70%;
  margin-top: 20px;
  position: relative;
  right: -28%;
  // z-index: 1;
  .msg-input {
    position: absolute;
    display: flex;
    bottom: 35px;
    width: inherit;
    overflow: hidden;
    z-index: 1;
    button {
      position: fixed;
      border-radius: 5px;
      border: 1px solid grey;
      margin-left: 3px;
      padding: 5px;
    }
    input {
      position: fixed;
      width: 62%;
      padding: 5px;
      margin-left: 58px;
    }
  }
}
</style>