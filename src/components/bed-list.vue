

<template>
  <section class="bed-list">
    <bed-preview v-for="bed in beds" :bed="bed" :key="bed.id"></bed-preview>
  </section>
</template>

<script>
import bedPreview from "@/components/bed-preview.vue";
export default {
  props: {
    beds: {
      type: Array,
      default: []
    }
  },
  components: {
    bedPreview
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";
.bed-list {
  width: 100%;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  //   justify-content: center;
  //   flex-wrap: wrap;
  margin: 0 auto;
}
</style>
