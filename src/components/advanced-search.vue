<template>
  <section class="advanced-search">
    <div class="primary-filter">
      <GmapAutocomplete
        class="auto-complete"
        placeholder="Bed Location"
        @place_changed="setPlace"
        required
      ></GmapAutocomplete>
      <!-- <div class="date-filter"> -->
      <link rel="stylesheet" href="https://unpkg.com/v-calendar/lib/v-calendar.min.css">
      <link
        rel="stylesheet"
        href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css"
      >
      <v-date-picker
        mode="range"
        class="date-picker-search"
        :min-date="new Date()"
        v-model="filter.selectedDate"
      >
        <b-field slot-scope="props">
          <b-input
            type="text"
            icon="calendar"
            placeholder="Pick your traveling time"
            :value="props.inputValue"
            @change.native="props.updateValue($event.target.value)"
            expanded
          ></b-input>
        </b-field>
      </v-date-picker>
      <img
        src="@/assets/img/filter.png"
        alt="More Filters"
        @click="toggleFilter"
        class="more-filters"
      >
      <button @click="setFilter">GO!</button>
      <!-- </div> -->
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
      isShown: false
    };
  },
  created() {
    this.filter = { ...this.$store.getters.getFilter };
    this.place = JSON.parse(JSON.stringify(this.$store.getters.getPlace));
  },
  // mounted() {
  //   if (!this.place.geometry.location) {
  //     this.place.geometry.location =  { lat: 32.0853, lng: 34.7818 }
  //     console.log(this.place)
  //   }
  // },
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
    selectedDate() {
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
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  img {
    height: 100%;
    min-width: 20px;
    align-self: center;
    margin-bottom: 10px;
    margin-left: 25px;
  }
  button {
    border: 1px solid white;
    min-width: 50px;
    border-radius: 4px;
    background: #222222;
    color: white;
    font-family: $main-font-bold;
    font-size: 15px;
    letter-spacing: 2px;
    padding: 0px 12px;
    margin-right: 15px;
    margin-left: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
}

.auto-complete {
  width: 40%;
  min-width: 150px;
  border-radius: 4px;
  max-width: 250px;
}

.date-picker-search {
  width: 30%;
  min-width: 150px;
  max-width: 250px;
}

.ameneties-filter {
  margin-top: 15px;
  text-align: left;
}

.date-filter {
  display: flex;
  justify-content: space-around;
  margin-top: 10px auto;
}
.advanced-search {
  display: block;
  width: 80%;
  margin: 0;
  input {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.go-button {
  margin-top: 15px;
}

.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.flex-container-second {
  width: 78%;
  align-content: center;
  flex-direction: row;
}
</style>
