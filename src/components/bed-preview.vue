<template>
  <router-link :to="'/bed/' + bed._id" class="bed-preview">
    <section>
      <img :src="bed.imgUrl" :title="bed.hostId" class="card-img">
      <div class="text-preview">
        <b>
          {{bed.hostName+ "'s " + bed.type}}
          <br>
          {{bed.location.street +', '+ bed.location.city[0].toUpperCase() + bed.location.city.slice(1)}}
        </b>
        <h4>
          {{bed.rating}}
          <img src="@/assets/img/star.png">
          ({{parseInt(Math.random()*50)}})
        </h4>
      </div>
    </section>
  </router-link>
</template>

<script>
export default {
  props: {
    bed: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style  scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.bed-preview {
  display: flex;
  text-align: left;
  justify-content: space-between;
  align-items: center;
  width: 25%;
  min-width: 150px;
  // height: inherit;
  margin: 20px 8px;
  background-color: $bg-color-secondary;
  border-radius: 4px;
  padding: 10px;
  border: 1px solid $border-color;
  color: $text-color-cards;
  .card-img {
    height: 150px;
    width: 100%;
    object-fit: cover;
  }
}

a {
  color: initial;
  text-decoration: initial;
}

.text-preview {
  flex-direction: column;
}
</style>
