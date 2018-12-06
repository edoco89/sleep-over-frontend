

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
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  margin: 0 auto;
}

@media (min-width: 800px) {
  .bed-list {
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  }
}
@media (min-width: 1000px) {
  .bed-list {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}
</style>
