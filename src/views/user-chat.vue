<template>
  <div v-if="currUser && userChats" :class="{'is-active' : showChatModal}" class="modal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content" ref="msgs">
      <ul class="user-list">
        <li
          v-for="user in userChats"
          :key="user._id"
          @click="openChat(user._id)"
          class="user-preview"
        >
          <img :src="user.imgUrl">
          {{user.fullname}}
          {{(userChatNewMsg[user._id]===0)? '': userChatNewMsg[user._id]}}
        </li>
      </ul>
      <chat-box @clearNotification="clearNotification" v-if="isShow" @mounted="scrollToEnd"></chat-box>
    </div>
    <button @click="closeModal" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import chatBox from "@/components/chat-box.vue";
export default {
  props: {
    showChatModal: Boolean
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    openChat(userId) {
      this.$store
        .dispatch({
          type: "getChatByIds",
          userId1: this.currUser._id,
          userId2: userId
        })
        .then(chat => {
          this.$socket.emit("chatRequest", {
            currUserId: this.currUser._id,
            userId,
            chatId: chat._id
          });
          this.$socket.emit("setNewMsgPerChatL", {
            chatId: chat._id,
            userId,
            number: this.userChatNewMsg[userId]
          });
          this.isShow = true;
          this.scrollToEnd();
        });
    },
    closeModal() {
      this.$emit("closeModal");
      this.isShow = false;
    },
    clearNotification(userId, chatId) {
      this.$socket.emit("setNewMsgPerChatL", {
        chatId,
        userId,
        number: this.userChatNewMsg[userId]
      });
    },
    scrollToEnd() {
      const elMsgs = this.$refs.msgs;
      elMsgs.scrollTop = elMsgs.scrollHeight - elMsgs.clientHeight;
    }
  },
  computed: {
    currUser() {
      return JSON.parse(JSON.stringify(this.$store.getters.loggedInUser));
    },
    userChats() {
      return JSON.parse(JSON.stringify(this.$store.getters.getUserChats));
    },
    userChatNewMsg() {
      return this.$store.getters.newMsgPerChat;
    },
    currChat() {
      return JSON.parse(JSON.stringify(this.$store.getters.getChat));
    }
  },
  components: {
    chatBox
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";
.modal-content {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.user-list {
  margin: 0;
  text-align: left;
  background: lightblue;
  width: 30%;
  overflow: scroll;
  overflow-x: hidden;
  height: 100%;
}
.user-preview {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: $main-font-bold;
  align-items: center;
  padding: auto;
  margin-top: 10px;
  border-bottom: 1px solid gray;
  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    object-fit: cover;
    object-position: top;
  }
}

@media (min-width: 700px) {
  .modal-content {
    width: 80%;
  }
  .user-list {
    padding: 5px 15px;
  }
  .user-preview {
    flex-direction: row;
    padding-bottom: 5px;
    img {
      margin-right: 10px;
    }
  }
}
</style>
