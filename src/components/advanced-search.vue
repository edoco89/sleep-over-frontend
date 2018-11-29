<template>
  <section class="advanced-search">
    <primary-search @setSearch="setSearch"></primary-search>
    <div class="ameneties-filter" v-if="false">
      Accesible
      <input
        @click="setFilterByAmenity('accessibility')"
        :checked="filter.filterByAmeneties.accessibility"
        type="checkbox"
      >
      Wifi
      <input
        @click="setFilterByAmenity('wifi')"
        :checked="filter.filterByAmeneties.wifi"
        type="checkbox"
      >
      Pets
      <input
        @click="setFilterByAmenity('acceptsPets')"
        :checked="filter.filterByAmeneties.acceptsPets"
        type="checkbox"
      >
      Air Conditioner
      <input
        @click="setFilterByAmenity('airConditioner')"
        :checked="filter.filterByAmeneties.airConditioner"
        type="checkbox"
      >
      Shampoo
      <input
        @click="setFilterByAmenity('shampoo')"
        :checked="filter.filterByAmeneties.shampoo"
        type="checkbox"
      >
      Parking
      <input
        @click="setFilterByAmenity('parking')"
        :checked="filter.filterByAmeneties.parking"
        type="checkbox"
      >
      <button @click="setFilter">Find</button>
    </div>
  </section>
</template>

<script>
import primarySearch from "@/components/primary-search.vue";
export default {
  data() {
    return {
      filter: {}
    };
  },
  created() {
    this.filter = { ...this.$store.getters.getFilter };
  },
  methods: {
    setFilter() {
      this.$store.dispatch({ type: "setFilte", filter: { ...this.filter } });
    },
      setSearch(ev) {
      console.log("filter", ev);
    },
    setFilterByAmenity(amenityType) {
      this.$store.dispatch({
        type: "setFilterByAmenity",
        amenityFilter: {
          name: amenityType,
          value: this.filter.filterByAmeneties[amenityType]
        }
      });
    }
  },
  watch: {
    filter() {
      return this.$store.getters.getFilter;
    }
  },
  components: {
    primarySearch
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";
.primary-filter {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: $container;
  height: inherit;
  margin: auto;
  background-color: $bg-color-secondary;
  border-radius: 4px;
}
</style>
