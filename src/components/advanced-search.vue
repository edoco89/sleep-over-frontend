<template>
  <section class="advanced-search">
    <div class="primary-filter">
      <GmapAutocomplete
        class="auto-complete"
        :value="place.formatted_address"
        ref="autoComp"
        placeholder="Where are you Traveling"
        @place_changed="setPlace"
        required
      ></GmapAutocomplete>
      <!-- <div class="date-filter"> -->
      <link rel="stylesheet" href="https://unpkg.com/v-calendar/lib/v-calendar.min.css">
      <link
        rel="stylesheet"
        href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css">
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
    </div>
    <div class="ameneties-filter" v-if="isShown">
      <select-menu opt="amenities" @setFilter="setFilterByAmenity"></select-menu>
    </div>
  </section>
</template>

<script>
import selectMenu from "./select-menu.vue";

export default {
  data() {
    return {
      filter: {},
      isShown: false,
       telAviv: {
        address_components: [
          {
            long_name: "Tel Aviv-Yafo",
            short_name: "Tel Aviv-Yafo",
            types: ["locality", "political"]
          },
          {
            long_name: "Tel Aviv District",
            short_name: "Tel Aviv District",
            types: ["administrative_area_level_1", "political"]
          },
          {
            long_name: "Israel",
            short_name: "IL",
            types: ["country", "political"]
          }
        ],
        adr_address:
          '<span class="locality">Tel Aviv-Yafo</span>, <span class="country-name">Israel</span>',
        formatted_address: "Tel Aviv-Yafo, Israel",
        geometry: {
          location: {
            lat: 32.0852999,
            lng: 34.78176759999997
          },
          viewport: {
            south: 32.029252,
            west: 34.742515899999944,
            north: 32.146611,
            east: 34.8519761
          }
        },
        icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
        id: "78708c592bddf3a50b3a14a24024728d4fa8a31d",
        name: "Tel Aviv-Yafo",
        photos: [
          {
            height: 3264,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/108909779665263407420/photos">Oleg Babich</a>'
            ],
            width: 4928
          },
          {
            height: 3840,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/117009792044813036647/photos">Gabe Bin</a>'
            ],
            width: 2160
          },
          {
            height: 3216,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/111838019904366548449/photos">איב לזרוב</a>'
            ],
            width: 4288
          },
          {
            height: 960,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/117306889785691401732/photos">מרינה שקרוב</a>'
            ],
            width: 1703
          },
          {
            height: 4128,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/106800621177355677550/photos">דודו חוגג</a>'
            ],
            width: 3096
          },
          {
            height: 1152,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/112338686538562542925/photos">Aldis Siu</a>'
            ],
            width: 2048
          },
          {
            height: 2988,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/103611520045186372298/photos">zeav barad</a>'
            ],
            width: 5312
          },
          {
            height: 2203,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/118396621758920590591/photos">Sirouch Petcherski</a>'
            ],
            width: 2933
          },
          {
            height: 2358,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/117311393447946448251/photos">Shimi</a>'
            ],
            width: 4192
          },
          {
            height: 2988,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/117306889785691401732/photos">מרינה שקרוב</a>'
            ],
            width: 4224
          }
        ],
        place_id: "ChIJH3w7GaZMHRURkD-WwKJy-8E",
        reference: "ChIJH3w7GaZMHRURkD-WwKJy-8E",
        scope: "GOOGLE",
        types: ["locality", "political"],
        url:
          "https://maps.google.com/?q=Tel+Aviv-Yafo,+Israel&ftid=0x151d4ca6193b7c1f:0xc1fb72a2c0963f90",
        utc_offset: 120,
        vicinity: "Tel Aviv-Yafo",
        html_attributions: []
      },
    };
  },
  created() {
    this.filter = { ...this.$store.getters.getFilter };
  },
  methods: {
    toggleFilter() {
      this.isShown = !this.isShown;
    },
    setFilterByAmenity(amenityTypes) {
      this.$store.dispatch({ type: "setFilterByAmenity", amenityTypes });
    },
    setFilter() {
      if (!this.$refs.autoComp.$refs.input.value) this.$store.dispatch({ type: "setFilterByLocation", place: null });
      this.$store.dispatch({ type: "setFilter", filter: { ...this.filter } });
    },
    setPlace(place) {
      if (!place.name) return
      place.geometry.location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      this.$store.dispatch({ type: "setFilterByLocation", place });
    }
  },
  computed: {
    place() {
      return JSON.parse(JSON.stringify(this.$store.getters.getPlace));
    }
  },
  watch: {
    filter() {
      return this.$store.getters.getFilter;
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
