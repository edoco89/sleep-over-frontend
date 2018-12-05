<template>
  <router-link :to="'/bed/' + bed._id" class="bed-preview">
    <section class="preview-container">
      <!-- <img :src="bed.imgUrl" :title="bed.hostId" class="card-img"> -->
      <photo-carusel class="photo-carousel-preview" :pics="bed.imgUrls"></photo-carusel>
      <div class="text-preview">
        <b>{{bed.hostName+ "'s " + bed.type}}</b>
        <br>
        <p>{{bed.location.address}}</p>
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
  height: 240px;
  background-color: $bg-color-secondary;
  border-radius: 4px;
  border: 1px solid $border-color;
  color: $text-color-cards;
  transition: 0.4s;
  &:hover {
    text-decoration: none;
    color: brown;
  }
  .card-img {
    height: 150px;
    width: 100%;
    object-fit: cover;
  }
  p {
    font-size: 13px;
  }
  b {
    font-size: 15px;
  }
}
.photo-carousel-preview {
  height: 110px;
}
p {
  font-size: 14px;
}
a {
  color: initial;
  text-decoration: initial;
}

.bed-rating {
  border-top: 1px solid $border-color;
  width: inherit;
  position: absolute;
  bottom: 0;
  padding: 5px;
  font-family: $main-font-bold;
  font-size: 13px;
  img {
    transform: rotate(-20deg);
  }
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

@media (max-width: 400px) {
  .bed-preview {
    height: 300px;
    img {
    }
    b {
      font-size: 18px;
    }
    p {
      font-size: 15px;
    }
  }
}
@media (min-width: 800px) {
  .bed-preview {
    height: 250px;
    b {
      font-size: 18px;
    }
    p {
      font-size: 15px;
    }
  }
  .photo-carousel-preview {
    height: 130px;
  }
}
@media (min-width: 1000px) {
  .bed-preview {
    height: 265px;
    b {
      font-size: 18px;
    }
    p {
      font-size: 13px;
    }
  }
}
</style>
