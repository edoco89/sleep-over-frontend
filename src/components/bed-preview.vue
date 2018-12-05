<template>
  <router-link :to="'/bed/' + bed._id" class="bed-preview">
    <section class="preview-container">
      <!-- <img :src="bed.imgUrl" :title="bed.hostId" class="card-img"> -->
      <photo-carusel class="photo-carousel-preview" :pics="bed.imgUrls"></photo-carusel>
      <div class="text-preview">
        <b>{{bed.hostName+ "'s " + bed.type}}</b>
        <br>
        <div>{{bed.location.address}}</div>
      </div>
    </section>
    <div class="bed-rating">
      <img src="@/assets/img/star.png">
      {{bed.rating}}
      |
      ({{parseInt(Math.random()*50)}})
    </div>
  </router-link>
</template>

<script>
import photoCarusel from "@/components/photo-carousel.vue";
export default {
  props: {
    bed: {
      type: Object,
      default: {}
    }
  },
  components: {
    photoCarusel
  }
};
</script>

<style  scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.bed-preview {
  position: relative;
  text-align: left;
  justify-content: space-between;
  width: 100%;
  background-color: $bg-color-secondary;
  border-radius: 4px;
  border: 1px solid $border-color;
  color: $text-color-cards;
  &:hover {
    text-decoration: none;
  }
  .card-img {
    height: 150px;
    width: 100%;
    object-fit: cover;
  }
}
.photo-carousel-preview {
  height: 110px;
}
b {
  font-size: 17px;
}
p {
  font-size: 14px;
}
a {
  color: initial;
  text-decoration: initial;
}
.preview-container {
}

.bed-rating {
  background: $border-color;
  width: inherit;
  position: absolute;
  bottom: 0;
  padding: 5px;
  font-family: $main-font-bold;
}

.text-preview {
  flex-direction: column;
  padding: 10px;
  font-family: $main-font-light;
  margin-bottom: 45px;
  b {
    font-family: $main-font-bold;
  }
}
</style>
