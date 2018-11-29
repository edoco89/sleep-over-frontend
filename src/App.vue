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
  }
};
</script>
<style>
.main-view {
  margin-top: 60px;
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

footer {
  margin-top: 35px;
  width: $container;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
