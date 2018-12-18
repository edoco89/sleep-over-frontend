<template>
  <section class="chat-container">
    <section class="chat" ref="chat">
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
    scrollToEnd() {
      console.log('this.currChat.messages.length', this.currChat.messages.length)
      const elMsgs = this.$refs.chat;
      elMsgs.scrollTop = elMsgs.scrollHeight - elMsgs.clientHeight;
    },
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
      this.scrollToEnd();
    },
    isEnterDown(ev) {
      if (ev.code === "Enter") this.sendMsg();
    }
  },
  // mounted() {
  //   this.scrollToEnd();
  //   // this.$emit("mounted");
  //   //window.scrollTo(null, 0)
  // },
  watch: {
    'currChat.messages.length'() {
      console.log('length changed');
      this.$nextTick().then(() => this.scrollToEnd())
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.chat-container {
  height: 100%;
  width: 70%;
  position: relative;
  .chat {
    height: 100%;
    overflow: scroll;
    p {
      margin: 0 10px;
      text-align: left;
      color: black;
      margin-top: 10px;
    }
    div {
      &:last-child {
        margin-bottom: 50px;
      }
      img {
        width: 85px;
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

    .book-approve {
      font-family: $main-font-bold;
      text-align: center;
      font-size: 18px;
      background: yellowgreen !important;
    }
  }
  .msg-input {
    width: 100%;
    border-top: 2px solid lightgray;
    display: flex;
    position: absolute;
    bottom: 0;
    right: 0;
    input {
      width: 80%;
    }
    button {
      width: 20%;
      font-family: $main-font-bold;
      background: brown;
      color: white;
      border: none;
    }
  }
}

@media (min-width: 700px) {
  .chat-container {
    .chat {
      p {
        margin: 0 40px;
        margin-top: 10px;
      }
    }
  }
}
</style>