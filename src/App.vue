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
<style scoped lang="scss">
@import '@/assets/scss/_vars.scss';

.main-view {
<<<<<<< HEAD
position: relative;
bottom: -60px;
margin-bottom: 50px;
=======
  padding-top: 66px;
>>>>>>> 1228b1da986f19fdbc05fbffbb0ffdeab6779957
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

<<<<<<< HEAD
=======
footer {
  margin-top: 35px;
}

>>>>>>> 1228b1da986f19fdbc05fbffbb0ffdeab6779957
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
