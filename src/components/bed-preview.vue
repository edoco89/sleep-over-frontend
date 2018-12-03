<template>
  <router-link :to="'/bed/' + bed._id" class="bed-preview">
    <section>
      <!-- <img :src="bed.imgUrl" :title="bed.hostId" class="card-img"> -->
      <photo-carusel :pics="bed.imgUrls"></photo-carusel>
      <div class="text-preview">
        <b>{{bed.hostName+ "'s " + bed.type}}</b>
        <br>
        <p>
          {{bed.location.address}}
          <br>
          {{bed.rating}}
          <img src="@/assets/img/star.png">
          ({{parseInt(Math.random()*50)}})
        </p>
      </div>
    </section>
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
  display: flex;
  text-align: left;
  justify-content: space-between;
  width: 100%;
  background-color: $bg-color-secondary;
  border-radius: 4px;
  padding: 10px;
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

.text-preview {
  flex-direction: column;
}
</style>
