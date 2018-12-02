<template>
  <section>
    <div class="toggle-view el-icon-location-outline" @click="showMap" title="Map view"></div>
    <advanced-search></advanced-search>
    <div class="results-display">
      <bed-list :beds="beds"></bed-list>
    </div>

    <div :class="{'is-active' : showModal}" class="modal">
      <div @click="closeModal" class="modal-background"></div>
      <div class="modal-content"></div>
      <result-map v-if="beds.length" :beds="beds"></result-map>
      <button @click="closeModal" class="modal-close is-large" aria-label="close"></button>
    </div>
  </section>
</template>

<script>
import bedList from "@/components/bed-list.vue";
import advancedSearch from "@/components/advanced-search.vue";
import resultMap from "@/components/bed-map.vue";

export default {
  data() {
    return { showModal: false };
  },
  computed: {
    beds() {
      return this.$store.getters.bedsToDisplay;
    }
  },
  methods: {
    showMap() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  },
  components: {
    bedList,
    advancedSearch,
    resultMap
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";
section {
  width: $container;
  margin: auto;
}
.results-display {
  display: flex;
  width: 100%;
  margin: auto;
}

.toggle-view {
  position: fixed;
  display: block;
  z-index: 1;
  font-size: 25px;
  background: white;
  padding: 10px;
  border: 1px solid rgb(68, 68, 68);
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
}
// @media (min-width: 1000px) {
//   .results-display {
//     display: flex;
//   }
// }
</style>
