<template>
  <section class="advanced-search">
      <input type="text" placeholder="Search for a bed here..."  v-model="filter.byCountry">
    <h3>
      Arrive
      <input v-model="filter.dateStart" type="date" required>
    </h3>
    <h3>
      Leave
      <input v-model="filter.dateEnd" type="date" required>
    </h3>
    <div class="ameneties-filter">
      Accesible
      <input v-model="filter.filterByAmeneties.accessibility" type="checkbox">
      Wifi
      <input v-model="filter.filterByAmeneties.wifi" type="checkbox">
      Pets
      <input v-model="filter.filterByAmeneties.acceptsPets" type="checkbox">
      Air Conditioner
      <input v-model="filter.filterByAmeneties.airConditioner" type="checkbox">
      Shampoo
      <input v-model="filter.filterByAmeneties.shampoo" type="checkbox">
      Parking
      <input v-model="filter.filterByAmeneties.parking" type="checkbox">
      
      <button @click="setFilter">Find</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        dateStart: '2018-01-01',
        dateEnd: '2029-12-31',
        byCountry: '',
        byCity: '',
        sortBy: {
          type: 'rating',
          order: -1
        },
        filterByAmeneties: {
          accessibility: false,
          wifi: false,
          acceptsPets: false,
          airConditioner: false,
          shampoo: false,
          parking: false
        }
      }
    };
  },
  created(){
      this.filter.byCountry = this.$store.getters.getFilterByCountry
  },
  methods: {
    setFilter() {
      const filter = this.filter;
      this.$store.dispatch({ type: "setFilte", filter });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

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
