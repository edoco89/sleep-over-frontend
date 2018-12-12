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
          {{user.fullname}}
          {{(userChatNewMsg[user._id]===0)? '': userChatNewMsg[user._id]}}
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

.user-list {
  text-align: left;
  background: lightblue;
  width: 25%;
  height: 69.7%;
  margin: 0;
  position: fixed;
  overflow: scroll;
  overflow-x: hidden;
}
.modal-content {
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 70%;
}
.user-preview {
  margin: 10px;
  z-index: 150;
  width: 100%;
  height: fit-content;
  padding-bottom: 5px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-family: $main-font-bold;
  border-bottom: 1px solid gray;
  img {
    margin-right: 10px;
    width: 85px;
    height: 85px;
    object-fit: cover;
    object-position: top;
    border-radius: 50%;
  }
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}

@media (max-width: 700px) {
  .user-preview {
    flex-direction: column;
    padding: 15px;
    margin: auto;
    text-align: center;
    img {
      margin: auto;
      width: 80%;
      // height: 80px;
    }
  }
}
</style>
