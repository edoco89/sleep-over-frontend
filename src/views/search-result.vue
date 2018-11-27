<template>
<<<<<<< HEAD
  <section>
    <bed-list :beds="beds"></bed-list>
  </section>
=======
    <section>
        <advanced-search> </advanced-search>
        <bed-list :beds="beds"></bed-list>
    </section>
>>>>>>> 0cf47761f25efa501054feaa24cc8f9b1eb65562
</template>

<script>
import bedList from '@/components/bed-list.vue'
import advancedSearch from '@/components/advanced-search.vue'

export default {
created(){
this.$store.dispatch('loadBeds')
},
computed:{
beds(){ return this.$store.getters.bedsToDisplay} 
},
components: {
    bedList,
    advancedSearch
}
}
</script>

<style>

</style>
