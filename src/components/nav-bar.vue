<template>
  <header>
    <section class="main-nav">
      <router-link to="/">
        <h1 class="logo">Sleepover</h1>
      </router-link>
      <div>
        <a v-if="getUser" @click="showChatModal= true" class="nav-chat">
          <img src="@/assets/img/chat.png">
        </a>|
        <router-link to="/searchResult">Search</router-link>|
        <a v-if="!getUser" @click="showModal = true">Login</a>
        <router-link
          v-if="getUser"
          exact
          :to="'/userProfile/' +getUser._id"
        >{{`Hello ${getUser.fullname}`}} |</router-link>
        <a v-if="getUser" @click="logout">Log-out</a>
        <!-- <router-link to="/about">About </router-link>| -->
      </div>
    </section>
    <login-modal :showModal="showModal" @closeModal="closeModal"></login-modal>
    <chat-modal :showChatModal="showChatModal" @closeModal="closeModal"></chat-modal>
  </header>
</template>


<script>
import loginModal from "./login-modal.vue";
import chatModal from "@/views/user-chat.vue";
export default {
  data() {
    return {
      showModal: false,
      showChatModal: false
    };
  },
  created() {
    const loggeduser = sessionStorage.loggedinUser;
    if (loggeduser) this.$store.dispatch("reconnectUser", { loggeduser });
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.showChatModal = false;
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  components: {
    loginModal,
    chatModal
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.logo {
  font-size: 1.8rem;
}
a:hover {
  text-decoration: none;
  color: inherit;
}

header {
  background: $bg-color;
  height: 60px;
  color: $text-color;
  background-color: $nav-bg-color;
  border-bottom: 1px $border-color solid;
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
}
h1 {
  width: fit-content;
  margin: 0;
  color: #222222;
}
.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: $container;
  height: inherit;
  margin: auto;
  div {
    width: fit-content;
    * {
      text-decoration: none;
      color: $text-color;
      div > *:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
}
a {
  margin: 5px;
}
.nav-chat{
img{
  height: 30px;
  padding-bottom: 5px;
  cursor: pointer;
}
}
</style>
