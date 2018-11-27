<template>
  <section class="advanced-search">
    <h3>Arrive <input :value="bedsFilter.dateStart" type="date"/></h3> <h3>Leave <input :value="bedsFilter.dateEnd" type="date"/></h3>
<button @click="setFilterByDate"> Search </button>
<div class="ameneties-filter"> 
    Accesible <input v-model="bedsFilter.accesible" type="checkbox"/> 
Wifi <input v-model="bedsFilter.wifi" type="checkbox"/>
Pets <input v-model="bedsFilter.acceptsPets" type="checkbox"/>
Air Conditioner <input v-model="bedsFilter.airConditioner" type="checkbox"/>
Shampoo <input v-model="bedsFilter.shampoo" type="checkbox"/>
Parking <input v-model="bedsFilter.parking" type="checkbox"/>

 </div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            bedsFilter: {
                dateStart: '2018-01-01',
                dateEnd: '2029-12-31',
                accesible: false,
                wifi: false,
                acceptsPets: false,
                airConditioner: false,
                shampoo: false,
                parking: false,
            }
        }
    },
 methods: {
        setFilterByDate(ev) {
            this.$store.dispatch({ type: 'setFilter', dateStart: this.bedsFilter })
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
