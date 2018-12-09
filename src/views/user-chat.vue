<template>
  <div v-if="currUser && userChats" :class="{'is-active' : showChatModal}" class="modal">
    <div class="modal-background" @click="$emit('closeModal')"></div>
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
        </li>
      </ul>
      <chat-box v-if="isShow"></chat-box>
    </div>
    <button @click="$emit('closeModal')" class="modal-close is-large" aria-label="close"></button>
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
      isShow: false,
      userChatNewMsg: []
    };
  },
  created() {
  //  this.userNewMsgPerChat()
    // this.$store.dispatch({type: "getChatsById",userId: this.currUser._id});
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
          // this.$socket.emit("setNewMsg", {
          //   chatId: chat._id,
          //   userId: this.currUser._id,
          //   number: -this.newMsgCount(userId).length
          // });
          this.isShow = true;
        });
    },
  userNewMsgPerChat() {
    JSON.parse(JSON.stringify(this.$store.getters.getUserChats)).map(async user => {
      return await this.$store.dispatch({
        type: "getChatByIds",
        userId1: this.currUser._id,
        userId2: user._id
      })
    .then( async chat => {
      return await chat.messages.filter(msg => {
            return msg.from !== this.currUser._id && msg.isRead === false;
                });
    })
        .then(async newMsgCountArray => {
          await this.userChatNewMsg.push({userId: user._id, newMsg: newMsgCountArray.length});
        });
    })
    }
    
  },
  filters: {
  newMsgCount(userId) {
    const chatData = this.userChatNewMsg.find(chat => {
      return chat.userId === userId
    })
    return chatData.newMsg
  }
  },
  computed: {
    currUser() {
      return JSON.parse(JSON.stringify(this.$store.getters.loggedInUser));
    },
    userChats() {
      // this.$store.dispatch({ type: "getChatsById", userId: this.currUser._id });
      return JSON.parse(JSON.stringify(this.$store.getters.getUserChats));
    },
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
