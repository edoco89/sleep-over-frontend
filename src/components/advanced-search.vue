<template>
  <section class="advanced-search">
    <h3>
      Arrive
      <input v-model="bedsFilterSorter.dateStart" type="date">
    </h3>
    <h3>
      Leave
      <input v-model="bedsFilterSorter.dateEnd" type="date">
    </h3>
    <button @click="setFilterFull">Search</button>
    <div class="ameneties-filter">
      Accesible
      <input v-model="bedsFilterSorter.filterByAmeneties.accesible" type="checkbox">
      Wifi
      <input v-model="bedsFilterSorter.filterByAmeneties.wifi" type="checkbox">
      Pets
      <input v-model="bedsFilterSorter.filterByAmeneties.acceptsPets" type="checkbox">
      Air Conditioner
      <input v-model="bedsFilterSorter.filterByAmeneties.airConditioner" type="checkbox">
      Shampoo
      <input v-model="bedsFilterSorter.filterByAmeneties.shampoo" type="checkbox">
      Parking
      <input v-model="bedsFilterSorter.filterByAmeneties.parking" type="checkbox">
      
      <button @click="setFilterFull">Search</button>
    </div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            bedsFilterSorter: {
                     dateStart: '2018-01-01',
                    dateEnd: '2029-12-31',
                    byCountry: '',
                    byCity: '',
                    sortBy: {
                         type: 'rating',
                         order: 1
                            },
                    filterByAmeneties :
                        {
                          accesible: false,
                          wifi: false,
                          acceptsPets: false,
                          airConditioner: false,
                          shampoo: false,
                          parking: false,
                        }
                    }
            }
        
    },
 methods: {
        setFilterFull(ev) {
            console.log (this.bedsFilterSorter)
            this.$store.dispatch({ type: 'loadBeds', filter: this.bedsFilterSorter })
        }, 
 }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_vars.scss';

section{
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
