<template>
  <header>
    <section class="main-nav">
      <router-link to="/">
        <h1 class="logo">Sleepover</h1>
      </router-link>
      <section class="all-menu-container">
        <div :class="'nav-items-container ' + isOpen">
          <a v-if="!getUser" @click="isOpen = '';  showModal = true">Login</a>
          <span v-if="getUser">{{`Hello ${getUser.fullname}`}}</span>
          <span v-if="getUser">|</span>
          <router-link
            v-if="getUser"
            @click.native="isOpen = ''"
            exact
            :to="'/userProfile/' +getUser._id"
          >My Profile</router-link>
          <span v-if="getUser">|</span>
          <a v-if="getUser" @click="logout">Log-out</a>
          <span v-if="getUser">|</span>
        </div>
        <div class="menu-chat">
          <span v-if="getUser">{{`Hello ${getUser.fullname}`}}</span>
          <a v-if="getUser" @click="openChatModal" class="nav-chat">
            <img src="@/assets/img/chat.png">
            <span>{{(newMsgCount===0)? '': newMsgCount}}</span>
          </a>
          <div class="el-icon-menu" @click="toggleMenu"></div>
        </div>
      </section>
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
      showChatModal: false,
      isOpen: ""
    };
  },
  created() {
    const loggeduser = sessionStorage.loggedinUser;
    if (loggeduser) {
      this.$store.dispatch("reconnectUser", { loggeduser })
      .then(() => {
        this.$store.dispatch({
          type: "getChatsById",
          userId: this.getUser._id
        });
      });
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen === "open" ? (this.isOpen = "") : (this.isOpen = "open");
    },
    closeModal() {
      this.showModal = false;
      this.showChatModal = false;
      if (!this.getUser) return
      this.$store.dispatch({
          type: "getChatsById",
          userId: this.getUser._id
        });
    },
    openChatModal(){
      this.$store.dispatch({type: "cleanCurrentChat"})
      this.showChatModal= true
    },
    logout() {
      this.isOpen = "";
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    }
  },
  computed: {
    getUser() {
      return JSON.parse(JSON.stringify(this.$store.getters.loggedInUser));
    },
    newMsgCount() {
      return this.$store.getters.getUserChatsNewMsg;
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

.all-menu-container {
  display: flex;
}

.logo {
  font-size: 1.8rem;
}
a:hover {
  text-decoration: none;
  color: inherit;
}

.nav-items-container {
  margin-top: 10px;
  color: #222222;
  a {
    color: #222222;
  }
  font-family: $main-font-bold;
  span:first-child {
    color: #222222;
    padding: 5px;
  }
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
      // color: $text-color;
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

.menu-chat {
  span {
    display: none;
  }
}
.nav-chat {
  position: relative;
  height: 15px;
  width: 15px;
  span {
    display: block;
    position: absolute;
    background: lightblue;
    font-family: $main-font-bold;
    font-size: 12px;
    padding: 0 3px;
    border-radius: 5px;
    top: -7px;
    right: -5px;
  }
  img {
    height: 30px;
    margin-top: 5px;
    cursor: pointer;
  }
}

.el-icon-menu {
  display: none;
}

@media (max-width: 700px) {
  .menu-chat {
    display: flex;
    align-items: center;
    span {
      display: block;
      margin-top: 8px;
      margin-right: 5px;
      font-family: $main-font-bold;
    }
    .el-icon-menu {
      display: block;
      cursor: pointer;
      font-size: 30px;
      color: #222222;
      padding-top: 8px;
    }
  }

  .nav-chat {
    position: relative;
    height: 15px;
    width: 30px;
    margin-bottom: 20px;
    margin-right: 10px;
    span {
      display: block;
      position: absolute;
      background: lightblue;
      font-family: $main-font-bold;
      font-size: 12px;
      padding: 0 3px;
      border-radius: 5px;
      top: -8px;
      right: -8px;
    }
    img {
      cursor: pointer;
    }
  }
  .nav-items-container {
    display: flex;
    flex-direction: column;
    border-radius: 0 0 0 4px;
    border-bottom: 1px solid lightgray;
    border-left: 1px solid lightgray;
    position: fixed;
    color: white;
    top: 50px;
    right: -200px;
    background: #222222;
    padding: 15px 35px;
    text-align: left;
    padding-bottom: 35px;
    height: fit-content;
    transition: 0.4s;
    span {
      display: none;
    }
    a {
      font-family: $main-font-bold;
      margin-bottom: 15px;
      color: white;
      border-bottom: 1px solid white;
      padding: 5px;
      &:last-child {
        border: none;
      }
      &:hover {
        opacity: 0.9;
      }
    }
  }
  .open {
    transform: translateX(-200px);
  }
}
</style>
