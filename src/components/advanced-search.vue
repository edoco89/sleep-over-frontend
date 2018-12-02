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
    <link rel="stylesheet" href="https://unpkg.com/v-calendar/lib/v-calendar.min.css">
    <link rel="stylesheet" href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css">
    <v-date-picker mode="range" :min-date="new Date()" v-model="filter.selectedDate">
      <b-field slot-scope="props">
        <b-input
          type="text"
          icon="calendar"
          placeholder="Pick your traveling time"
          :value="props.inputValue"
          @change.native="props.updateValue($event.target.value)"
          expanded></b-input>
      </b-field>
    </v-date-picker>
      </div>
      <button @click="setFilter">GO!</button>
    </div>

    <div class="ameneties-filter" v-if="isShown">
      <select-menu @setFilter="setFilterByAmenity"></select-menu>
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
      isShown: false,
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
    setFilterByAmenity(amenityTypes) {
      this.$store.dispatch({ type: "setFilterByAmenity", amenityTypes });
    },
    setFilter() {
      this.$store.dispatch({ type: "setFilter", filter: { ...this.filter } });
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
    },
    selectedDate(){
      return this.$store.getters.getSelectedDate;
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
