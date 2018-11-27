<template>
  <section>
    <bed-list :beds="beds"></bed-list>
  </section>
</template>

<script>
import bedList from '@/components/bed-list.vue'

export default {
created(){
this.$store.dispatch('loadBeds')
},
computed:{
beds(){ return this.$store.getters.bedsToDisplay} 
},
components: {
    bedList
}
}
</script>

<style>

</style>
