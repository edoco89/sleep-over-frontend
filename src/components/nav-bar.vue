<template>
  <header>
    <section class="main-nav">
      <router-link to="/">
        <h1 class="logo">Sleepover</h1>
      </router-link>
      <button @click="$store.dispatch('queryUsers')">query!!</button>
      <div>
        <router-link to="/searchResult">Search</router-link>|
        <a v-if="!getUser" @click="showModal = true">Login</a>
        <router-link v-if="getUser" exact to="/userProfile">{{`Hello ${getUser.fullname}`}} |</router-link>
        <a v-if="getUser" @click="logout">Log-out</a>
        <!-- <router-link to="/about">About </router-link>| -->
      </div>
    </section>
    <login-modal :showModal="showModal" @closeModal="closeModal"></login-modal>
  </header>
</template>

<script>
import loginModal from "./login-modal.vue";
export default {
  data() {
    return {
      showModal: false
    };
  },
  created() {
    const loggeduser = sessionStorage.loggedinUser;
    if (loggeduser) this.$store.dispatch("reconnectUser", { loggeduser });
  },
  methods: {
    closeModal() {
      this.showModal = false;
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
    loginModal
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
}
.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: $container;
  height: inherit;
  margin: auto;
}
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
a {
  margin: 5px;
}
</style>
