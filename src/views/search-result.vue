<template>
  <section>
    <advanced-search></advanced-search>
    <!-- <bed-list :beds="beds"></bed-list> -->
    <result-map v-if="beds.length" :beds="beds"></result-map>
  </section>
</template>

<script>
import bedList from '@/components/bed-list.vue'
import advancedSearch from '@/components/advanced-search.vue'
import resultMap from '@/components/bed-map.vue'

export default {
   created(){
this.$store.dispatch({type: 'loadBeds', filter: {}})
},
computed:{
beds(){return this.$store.getters.bedsToDisplay} 
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
