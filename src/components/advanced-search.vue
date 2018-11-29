<template>
  <section class="advanced-search">
      <GmapAutocomplete placeholder="Search for a bed here..." @place_changed="setPlace" required></GmapAutocomplete>
    <h3>
      Arrive
      <input v-model="filter.dateStart" type="date" required>
    </h3>
    <h3>
      Leave
      <input v-model="filter.dateEnd" type="date" required>
    </h3>
    <div class="ameneties-filter">
      Accesible
      <input @click="setFilterByAmenity('accessibility')" 
             :checked="filter.filterByAmeneties.accessibility" 
             type="checkbox">
      Wifi
      <input @click="setFilterByAmenity('wifi')" 
             :checked="filter.filterByAmeneties.wifi" 
             type="checkbox">
      Pets
      <input @click="setFilterByAmenity('acceptsPets')" 
             :checked="filter.filterByAmeneties.acceptsPets" 
             type="checkbox">
      Air Conditioner
            <input @click="setFilterByAmenity('airConditioner')" 
             :checked="filter.filterByAmeneties.airConditioner" 
             type="checkbox">
      Shampoo
      <input @click="setFilterByAmenity('shampoo')" 
             :checked="filter.filterByAmeneties.shampoo" 
             type="checkbox">
      Parking
            <input @click="setFilterByAmenity('parking')" 
             :checked="filter.filterByAmeneties.parking" 
             type="checkbox">      
      <button @click="setFilter">Find</button>
    </div>
  </section>
</template>

<script>
import mapService from "@/services/mapService.js";

export default {
  data() {
    return {
      filter: {},
      place: {}
    };
  },
  created() {
    this.filter = { ...this.$store.getters.getFilter };
    var autocomplete2 = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete2"),
      { types: ["geocode"] }
    );
    this.place = JSON.parse(JSON.stringify(this.$store.getters.getPlace));
  },
  methods: {
    setFilter() {
      this.$store.dispatch({ type: "setFilter", filter: { ...this.filter } });
    },
    setFilterByAmenity(amenityType) {
      this.$store.dispatch({
        type: "setFilterByAmenity",
        amenityFilter: {
          name: amenityType,
          value: this.filter.filterByAmeneties[amenityType]
        }
      });
    },
    setPlace(place) {
      place.geometry.location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      this.$store.dispatch({ type: "setFilterByLocation", place });
    }
  },
  watch: {
    filter() {
      return this.$store.getters.getFilter;
    },
    place() {
      return this.$store.getters.getPlace;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: $container;
  height: inherit;
  margin: auto;
  background-color: $bg-color-secondary;
  border-radius: 4px;
}
</style>
