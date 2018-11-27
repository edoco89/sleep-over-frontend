<template>
  <sectoin>
    <div>Host IMG</div>
    <div>bed gallery</div>
    <div>details</div>
  </sectoin>
</template>

<script>
export default {
data(){
  return{

  }
},
created(){
     const hostId = this.$route.params.hostId;
        if (hostId) {
            this.$store.dispatch({ type: 'getBedById', hostId })
        }
}
}
</script>

<style>

</style>
