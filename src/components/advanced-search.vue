<template>
  <section class="advanced-search">
    <div class="primary-filter">
      <img
        src="@/assets/img/filter.png"
        alt="More Filters"
        @click="toggleFilter"
        class="more-filters"
      >
      <GmapAutocomplete placeholder="Search for a bed here..." @place_changed="setPlace" required></GmapAutocomplete>
      <div class="date-filter">
        <h6>
          From:
          <input v-model="filter.dateStart" type="date" required>
        </h6>
        <h6>
          To:
          <input v-model="filter.dateEnd" type="date" required>
        </h6>
      </div>
      <button @click="setFilter">GO!</button>
    </div>

    <div class="ameneties-filter" v-if="isShown">
      <select-menu @setFilter="setFilterByAmenity"></select-menu>Accesible
      <input
        @click="setFilterByAmenity('accessibility')"
        :checked="filter.filterByAmeneties.accessibility"
        type="checkbox"
      >
      Wifi
      <input
        @click="setFilterByAmenity('wifi')"
        :checked="filter.filterByAmeneties.wifi"
        type="checkbox"
      >
      Pets
      <input
        @click="setFilterByAmenity('acceptsPets')"
        :checked="filter.filterByAmeneties.acceptsPets"
        type="checkbox"
      >
      Air Conditioner
      <input
        @click="setFilterByAmenity('airConditioner')"
        :checked="filter.filterByAmeneties.airConditioner"
        type="checkbox"
      >
      Shampoo
      <input
        @click="setFilterByAmenity('shampoo')"
        :checked="filter.filterByAmeneties.shampoo"
        type="checkbox"
      >
      Parking
      <input
        @click="setFilterByAmenity('parking')"
        :checked="filter.filterByAmeneties.parking"
        type="checkbox"
      >
    </div>
  </section>
</template>

<script>

import selectMenu from "./select-menu.vue";

export default {
  data() {
    return {
      filter: {},
      place: {},
      isShown: false
    };
  },
  created() {
    this.filter = { ...this.$store.getters.getFilter };
    this.place = JSON.parse(JSON.stringify(this.$store.getters.getPlace));
  },
  methods: {
    toggleFilter() {
      this.isShown = !this.isShown;
    },
    setFilter() {
      this.$store.dispatch({ type: "setFilter", filter: { ...this.filter } });
    },
    setFilterByAmenity(amenityType) {
      //TODO WITH IDO
      console.log(amenityType);

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
  },
  components: {
    selectMenu
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";
input {
  font-size: 14px;
  padding: 3px;
  border: 1px solid lightgrey;
}

.more-filters {
  float: right;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}

.primary-filter {
  width: 100%;
  margin: auto;
  margin-top: 10px;
}

.date-filter {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
  input {
  }
}
.advanced-search {
  display: block;
  margin-bottom: 10px;
}
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
