<template>
  <section>
    <div class="amenities-cont">
      <div v-if="details.shampoo">
        <img src="@/assets/img/shampoo.png" alt="shampoo">
        Shampoo
      </div>
      <div v-if="details.accessibility">
        <img src="@/assets/img/accesible.png" alt="accessibility">
        Accesible
      </div>
      <div v-if="details.wifi">
        <img src="@/assets/img/wifi.png" alt="wifi">
        Wifi
      </div>
      <div v-if="details.acceptsPets">
        <img src="@/assets/img/pets.png" alt="acceptsPets">
        Pets Allowed
      </div>
      <div v-if="details.airConditioner">
        <img src="@/assets/img/ac.png" alt="airConditioner">
        AC
      </div>
      <div v-if="details.parking">
        <img src="@/assets/img/parking.png" alt="parking">
        Parking
      </div>
      <div v-if="details.children">
        <img src="@/assets/img/children.png" alt="children">
        Have Children
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    details: Object
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
