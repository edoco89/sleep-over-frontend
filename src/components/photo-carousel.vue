<template>
  <div v-if="pics">
    <b-carousel
      id="carousel1"
      style="text-shadow: 1px 1px 2px #333;"
      controls
      indicators
      background="#ababab"
      :interval="0"
      img-width="1024"
      img-height="480"
      v-model="slide"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide class="slide-img" v-for="(pic,idx) in pics" :key="idx" :img-src="pic"></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  props: {
    pics: Array
  },
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

<style scoped lang="scss">
.slide-img {
  height: inherit;
  width: inherit;
}

.carousel-inner {
  height: 350px;
}
</style>