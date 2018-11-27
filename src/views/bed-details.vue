<template>
  <section v-if="bed">
    <!-- <img :src="bed.roomImg"> -->
    <!-- <img :src="bed.userImg"> -->
    <div>{{bed.type}}</div>
    <span>{{bed.location.country}}</span>
    <span>{{bed.location.city}}</span>
    <span>{{bed.location.street}}</span>
    <div>{{bed.rating}}</div>
    <div>{{bed.amenities}}</div>
  </section>
</template>

<script>
export default {
  created(){
    this.$store.dispatch({ type: 'getBedById'})
      //  const hostId = this.$route.params.bedId;
      //     if (bedId) {
      //         this.$store.dispatch({ type: 'getBedById', bedId })
      //     }
  },
computed: {
        bed() {
            return this.$store.getters.getCurrBed
        }
    },
}
</script>

<style>

</style>
