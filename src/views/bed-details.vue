<template>
  <section v-if="bed">
    <div class="img-gallery">
      <img class="main-img" :src="bed.hostImg">
      <div class="gallery-img">
        <img :src="bed.imgUrl">
        <img :src="bed.imgUrl">
        <img :src="bed.imgUrl">
        <img :src="bed.imgUrl">
      </div>
    </div>

    <div class="details-bottom">
      <div class="flex-col">
        <div class="flex-col-start">
          <h5 class="minor-header">{{bed.type}}</h5>
          <h2 class="summary-standout">
            {{bed.hostName+ ' ' + bed.type}} in
            {{bed.location.city[0].toUpperCase() + bed.location.city.slice(1)}}
          </h2>
          <h4 class="secondary-header">{{bed.location.country}}</h4>
        </div>

        <div class="host-details">
          <h4>
            <b>Languages:</b>
            {{bed.languages.join(', ')}}
          </h4>
          <h4>
            <b>Host Rating:</b>
            {{bed.rating}}
          </h4>

          <!-- {{bed.ameneties}} -->
          <div v-if="ament.isAvailable" v-for="(ament,name) in bed.ameneties" :key="name">
            <b>{{name}}</b>
            <!-- <img :title="ament" src="../assets/img/shampoo.png"> -->
            <img :title="ament.name" :src="ament.src">
          </div>
        </div>
      </div>

      <!-- <v-calendar :attributes="attrs"></v-calendar> -->
      <div class="booking-container">
        <book-bed></book-bed>
      </div>
    </div>

    <div>{{(bed.reviews.length > 0)? bed.reviews : ''}}</div>
  </section>
</template>

<script>
import bookBed from "@/components/book-bed.vue";

export default {
  data() {
    return {};
  },
  created() {
    const bedId = this.$route.params.bedId;
    if (bedId) {
      this.$store.dispatch({ type: "getBedById", bedId });
    }
  },
  computed: {
    bed() {
      return this.$store.getters.getCurrBed;
    }
  },
  components: {
    bookBed
  }
};
</script>

<style  scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.img-gallery {
  display: flex;
}
.main-img {
  object-fit: cover;
  max-height: 340px;
  border: 1px solid gray;
  min-height: 340px;
  width: 50%;
}

.gallery-img {
  display: flex;
  flex-wrap: wrap;
  max-height: 340px;
  img {
    border: 1px solid gray;
    height: 170px;
    width: 50%;
    object-fit: cover;
  }
}

// img {
//   align-self: flex-start;
//   margin: 25px 0;
//   object-fit: cover;
// }

section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: $container;
  height: inherit;
  margin: auto;
  font-family: $main-font-bold;
}

.amenities {
  border: $border-color 1px solid;
  width: 100%;
  flex-wrap: wrap;
}

.minor-header {
  font-size: 0.7rem;
}

.summary-standout {
  font-size: 1.3rem;
}

.secondary-header {
  font-size: 0.9rem;
}

.flex-col-start {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  padding: 10px;
  text-align: start;
}

.booking-container {
  display: flex;
  border: 1px $border-color solid;
  flex-direction: row;
}

.details-bottom {
  display: flex;
  flex-direction: row;
}

.host-details {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  font-family: $main-font-light;
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
