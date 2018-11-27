<template>
  <section v-if="bed">
    <img class="main-img" :src="bed.imgUrl">
    <!-- <img :src="bed.userImg"> -->
    <div class="host-details" >
      <h4>Languages: {{bed.languages.join(', ')}}</h4>
          <h4>Rating: {{bed.rating}}</h4>
          <div>{{bed.type}}</div>
          <span>{{bed.location.country}}</span>
          <div>{{bed.rating}}</div>
          <div>{{bed.amenities}}</div>
          <div>{{(bed.reviews.length > 0)? bed.reviews : ''}}</div>
    </div>
  </section>
</template>

<script>
export default {
  created() {
    const bedId = this.$route.params.bedId;
    if (bedId) {
      this.$store.dispatch({ type: 'getBedById', bedId });
    }
  },
  computed: {
    bed() {
      return this.$store.getters.getCurrBed;
    }
  }
};
</script>

<style  scoped lang="scss">
@import "@/assets/scss/_vars.scss";

img {
  height: 300px;
  margin: 25px 0;
}
</style>

//  {
//             id: 1,
//             hostId: 1,
//             languages: ['Hebrew', 'English'],
//             imgUrl: 'https://a0.muscache.com/im/pictures/505bc60e-5bee-40ce-9972-8a166d997ea5.jpg?aki_policy=xx_large',
//             location: {
//                 country: 'israel',
//                 city: 'tel-aviv',
//                 street: 'sokolov',
//                 coords: {
//                     lat: 32.0853,
//                     lng: 34.7818
//                 }
//             },
//             type: 'couch',
//             rating: 4.5,
//             reviews: [{}, {}, {}],
//             ditstanceFromCityCenter: 12,
//             ameneties: {
//                 accesible: true,
//                 wifi: false,
//                 acceptsPets: true,
//                 airConditioner: false,
//                 shampoo: true,
//                 parking: false,
//             },
