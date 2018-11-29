<template>
  <section>
    <advanced-search></advanced-search>
    <bed-list :beds="beds"></bed-list>
<<<<<<< HEAD
    <!-- <result-map v-if="beds.length" :beds="beds"></result-map> -->
=======
    <result-map v-if="beds.length" :beds="beds"></result-map>
>>>>>>> 504b86008bfd11dfc25ae0dd8d1211737254c20a
  </section>
</template>

<script>
import bedList from '@/components/bed-list.vue';
import advancedSearch from '@/components/advanced-search.vue';
import resultMap from '@/components/bed-map.vue'

export default {
  computed: {
    beds() {
      return this.$store.getters.bedsToDisplay;
    }
  },
  components: {
    bedList,
    advancedSearch,
    resultMap
  }
}
</script>

<style>
</style>
