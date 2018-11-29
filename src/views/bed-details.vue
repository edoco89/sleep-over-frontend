<template>
  <section v-if="bed" class="bed-details">
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
      <div>
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
            <b>Host Rating:</b>
            {{bed.rating}}
            <img src="@/assets/img/star.png">
          </h4>
          <h4>
            <b>About Me:</b>
            <br>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat quaerat animi quam. Veniam fugiat delectus molestias iusto dolores cupiditate neque nemo iure aliquam, veritatis nulla modi velit saepe error fuga.
          </h4>
          <h4>
            <b>Languages:</b>
            {{bed.languages.join(', ')}}
          </h4>
          <b>Home Amenities:</b>
          <bed-amenities :details="bed.ameneties"></bed-amenities>
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
import bedAmenities from "@/components/bed-amenities.vue";

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
    bookBed,
    bedAmenities
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
  border: 1px solid $border-color;
  border-top: none;
  min-height: 340px;
  width: 50%;
}

.gallery-img {
  display: flex;
  flex-wrap: wrap;
  max-height: 340px;
  img {
    border: 1px solid $border-color;
    border-top: none;
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

.bed-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: $container;
  height: inherit;
  margin: auto;
  font-family: $main-font-bold;
}

h4 {
  text-align: left;
  margin-bottom: 5px;
  img {
    bottom: -4px;
    position: relative;
  }
}
.amenities {
  border: $border-color 1px solid;
  width: 100%;
  flex-wrap: wrap;
}

.host-img {
  height: 130px;
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
  margin: 15px;
}

.details-bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid rgb(199, 199, 199);
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
