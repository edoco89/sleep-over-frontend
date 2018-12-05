<template>
  <footer>
    <!-- <section>Copy Rights 2018</section> -->
  </footer>
</template>

<script>
export default {
  methods: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

* {
  font-family: $main-font-bold;
}

footer {
  height: 40px;
  background-color: #222222;
  grid-row: 1000;
  position: absolute;
  width: 100%;
  bottom: -110px;
}

section {
  width: $container;
  margin: auto;
  height: 2.5rem;
}
</style>
