<template>
  <div v-if="currUser && userChats" :class="{'is-active' : showChatModal}" class="modal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <ul class="user-list">
        <li
          v-for="user in userChats"
          :key="user._id"
          @click="openChat(user._id)"
          class="user-preview"
        >
          <img :src="user.imgUrl">
          <div class="user-name">
            {{user.fullname}}
            <span
              v-if="userChatNewMsg[user._id]>0"
              class="new-msg"
            >{{userChatNewMsg[user._id]}}</span>
          </div>
        </li>
      </ul>
      <chat-box @clearNotification="clearNotification" v-if="isShow"></chat-box>
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
      this.isShow = true;
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
        });
    },
    closeModal() {
      this.$emit("closeModal");
      this.isShow = false;
    },
    clearNotification(userId, chatId) {
      this.scrollToEnd();
      this.$socket.emit("setNewMsgPerChatL", {
        chatId,
        userId,
        number: this.userChatNewMsg[userId]
      });
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

.user-name {
  position: relative;
  .new-msg {
    position: absolute;
    top: -8px;
    font-family: $main-font-bold;
    right: -10px;
    background: red;
    color: white;
    padding: 0 5px;
    font-size: 12px;
    border-radius: 10px;
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
