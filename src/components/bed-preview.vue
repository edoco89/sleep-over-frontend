<template>
  <router-link :to="'/bed/' + bed._id" class="bed-preview">
    <section class="preview-container">
      <photo-carusel class="photo-carousel-preview" :pics="bed.imgUrls"></photo-carusel>
      <div class="text-preview">
        <span>
          <b>{{bed.hostName+ "'s " + bed.type}}</b>
        </span>
        <br>
        <p>{{bed.location.address}}</p>
        <div class="host-preview">
          <img
            class="host-badge"
            v-if="bed.isSuperHost"
            src="@/assets/img/badge.png"
            :title="bed.hostName + ' is a Super Host!'"
          >
          <img class="host-img" :src="bed.hostImg">
          <div>"{{bed.catchPhrase}}"</div>
        </div>
      </div>
    </section>
    <div class="bed-rating">
      <img src="@/assets/img/star.png">
      {{bed.rating}}
      |
      ({{parseInt(Math.random()*50 + 10)}})
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
  width: 100%;
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
  p {
    font-size: 10px;
  }
  .host-preview {
    position: relative;
  }
}

.bed-preview {
  height: 320px;

  b {
    font-size: 18px;
  }
}
.photo-carousel-preview {
  height: 150px;
}
.host-preview {
  display: flex;
  div {
    font-size: 14px;
    padding-left: 10px;
  }
}
.host-badge {
  width: 25px;
  position: absolute;
  top: 0px;
  left: -3px;
}
.host-img {
  border-radius: 50%;
  border: 1px solid lightgray;
  width: 60px;
  height: 60px;
  object-fit: cover;
  object-position: top;
}
@media (min-width: 400px) {
  .bed-preview {
    height: 350px;
  }
  .photo-carousel-preview {
    height: 120px;
  }
  .text-preview {
    b {
      font-size: 15px;
    }
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .host-preview {
    div {
      height: 130px;
      overflow: hidden;
    }
  }
}

@media (min-width: 800px) {
  .bed-preview {
    height: 345px;
    b {
      font-size: 18px;
    }
  }
  .text-preview {
    p {
      font-size: 13px;
      margin-bottom: 25px;
    }
  }
  .host-preview {
    div {
      height: 100px;
    }
  }
  .photo-carousel-preview {
    height: 130px;
  }
}
@media (min-width: 1000px) {
  .photo-carousel-preview {
    height: 150px;
  }
  .text-preview {
    p {
      margin-bottom: 17px;
    }
  }
  .host-preview {
    div {
      height: 85px;
    }
  }
  .host-img {
    width: 65px;
    height: 65px;
  }
}
</style>
