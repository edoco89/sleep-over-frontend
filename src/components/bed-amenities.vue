<template>
  <section v-if="show">
    <b>Home Amenities:</b>
    <div class="amenities-cont">
      <div v-if="details.Shampoo">
        <img src="@/assets/img/shampoo.png" alt="shampoo">
        Shampoo
      </div>
      <div v-if="details.Accessible">
        <img src="@/assets/img/accesible.png" alt="accessibility">
        Accesible
      </div>
      <div v-if="details.Wifi">
        <img src="@/assets/img/wifi.png" alt="wifi">
        Wifi
      </div>
      <div v-if="details.Pets">
        <img src="@/assets/img/pets.png" alt="acceptsPets">
        Pets Allowed
      </div>
      <div v-if="details['Air Conditioner']">
        <img src="@/assets/img/ac.png" alt="airConditioner">
        AC
      </div>
      <div v-if="details.Parking">
        <img src="@/assets/img/parking.png" alt="parking">
        Parking
      </div>
      <div v-if="details['Children Ok']">
        <img src="@/assets/img/children.png" alt="children">
        Have Children
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    aments: Object
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    details() {
      return this.aments;
    }
  },
  mounted() {
    console.log("amentss", this.aments);
    for (let key in this.aments) {
      if (this.aments[key]) return (this.show = true);
    }
    this.show = false;
  }
};
</script>

<style scoped lang="scss">
.amenities-cont {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 150px;
  div {
    text-align: left;
    margin: 3px;
  }
}
</style>
