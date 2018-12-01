<template>
<section>
        <img class="single-img" :src="user.imgUrl">


</section>
</template>

<script>
export default {
  created() {
    const userId = this.$route.params.userId;
    if (userId) {
      this.$store.dispatch({ type: "getUserById", userId });
    }
  },
}
</script>

<style>

</style>
