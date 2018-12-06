<template>
  <div :class="{'is-active' : showChatModal}" class="modal">
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
      userChats: [],
      currUser: {},
      isShow: false
    };
  },
  created() {
    this.currUser = JSON.parse(
      JSON.stringify(this.$store.getters.loggedInUser)
    );
    this.$store
      .dispatch({ type: "getChatsById", userId: this.currUser._id })
      .then(users => (this.userChats = users));
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
          this.isShow = true;
        });
    }
  },
  mounted() {
    this.$store
      .dispatch({ type: "getChatsById", userId: this.currUser._id })
      .then(users => (this.userChats = users));
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
  height: fit-content;
  padding-bottom: 5px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-family: $main-font-bold;
  border-bottom: 1px solid gray;
  img {
    margin-right: 10px;
    width: 80px;
    height: 80px;
    object-fit: cover;
    object-position: top;
    border-radius: 50%;
  }
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}
</style>
