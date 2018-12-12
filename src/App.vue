<template>
  <div id="app">
    <nav-bar></nav-bar>
    <section class="main-view">
      <router-view/>
    </section>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import navBar from "./components/nav-bar.vue";
import footerBar from "./components/footer-bar.vue";

export default {
  components: {
    navBar,
    footerBar
  },
  sockets: {
    connect(x) {
      console.log('connected to socket. got:', x)
    },
    disconnect(x) {
      console.log('disconnected from socket. got:', x)
    },
  }
};
</script>
<style scoped lang="scss">
@import '@/assets/scss/_vars.scss';

.main-view {
position: relative;
bottom: -60px;
margin-bottom: 50px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
