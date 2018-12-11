<template>
  <section class="map-container">
    <GmapMap
      ref="map"
      :center="currMapCenter"
      :zoom="13"
      :options="mapStyle"
      map-type-id="terrain"
      style="width: 100%; height: 100%"
      @click="closeDetails"
    >
      <GmapMarker
        :key="index"
        v-for="(bed, index) in beds"
        :position="{lat: bed.location.coords.coordinates[1], lng: bed.location.coords.coordinates[0]}"
        :clickable="true"
        :icon="{ url : require('@/assets/img/map-marker.png')}"
        :draggable="false"
        @click="showDetails(bed,index)"
      />
    </GmapMap>
    <button class="my-locatoin" @click="goToMyLocation">
      <img src="@/assets/img/my_location.png">
    </button>

    <section :class="chosenBed">
      <div @click="closeDetails" class="el-icon-circle-close"></div>
      <router-link v-if="isChosen" :to="'/bed/' + chosenDetails._id" class="chosen-bed-container">
        <photo-carusel class="carousel-img" :pics="chosenDetails.imgUrls"></photo-carusel>
        <div>
          <b>{{chosenDetails.hostName+ "'s " + chosenDetails.type}}</b>
          <br>
          <p>{{chosenDetails.location.address}}</p>
          <span>
            <img src="@/assets/img/star.png">
            {{chosenDetails.rating}}
            |
            ({{parseInt(Math.random()*50 + 10)}})
          </span>
        </div>
      </router-link>
    </section>
  </section>
</template>

<script>
import photoCarusel from "@/components/photo-carousel.vue";

export default {
  props: {
    beds: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      mapStyle: {
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#ebe3cd"
              }
            ]
          },
          {
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#f4edb5"
              },
              {
                saturation: 10
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#ca6500"
              },
              {
                visibility: "on"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#f5f1e6"
              }
            ]
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#c9b2a6"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#dcd2be"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#ae9e90"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
              {
                color: "#dfd2ae"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#dfd2ae"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#93817c"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#a5b076"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#447530"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#f5f1e6"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: "#fdfcf8"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#f8c967"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#e9bc62"
              }
            ]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [
              {
                color: "#e98d58"
              }
            ]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#db8555"
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#806b63"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [
              {
                color: "#dfd2ae"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#8f7d77"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#ebe3cd"
              }
            ]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
              {
                color: "#dfd2ae"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#8db89c"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#92998d"
              }
            ]
          }
        ]
      },
      place: {},
      isChosen: false,
      chosenDetails: null
    };
  },
  created() {
    this.place = this.$store.getters.getPlace;
  },
  methods: {
    goToMyLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.place = this.$store.getters.getPlace;
        this.place.geometry.location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.$store.dispatch({
          type: "setFilterByLocation",
          place: this.place
        });
      });
    },
    showDetails(bed, index) {
      this.isChosen = true;
      this.chosenDetails = bed;
      console.log("bed!!", this.chosenDetails);
    },
    closeDetails() {
      this.isChosen = false;
    }
  },
  computed: {
    chosenBed() {
      if (this.isChosen) return "chosen";
      else return "not-chosen";
    },
    currMapCenter() {
      const place = this.$store.getters.getPlace;
      const currMapCenter = {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      };
      return currMapCenter;
    }
  },
  components: {
    photoCarusel
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";
.switch-store {
  display: flex;
  div {
    padding: 10px;
    border: 2px solid black;
    margin: 10px;
    &:hover {
      cursor: pointer;
    }
  }
}
.not-chosen {
  position: absolute;
  bottom: 0px;
  height: 0px;
  width: $container;
  transition: 0.4s;
  * {
    height: 0;
    line-height: 0;
    visibility: hidden;
  }
}
.my-locatoin {
  position: relative;
  width: 40px;
  height: 40px;
  top: -230px;
  left: -10px;
  border: none;
  padding: 5px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  border-radius: 2px;
  float: right;
  &:hover {
    cursor: pointer;
    opacity: 0.85;
  }
  &:focus {
    outline: none;
  }
}
.chosen {
  border-top: 1px solid lightgray;
  position: absolute;
  bottom: 0px;
  height: 150px;
  display: flex;
  align-items: center;
  padding: 5px;
  width: $container;
  background: white;
  transition: 0.4s;
  overflow: hidden;
  * {
    height: fit-content;
    visibility: visible;
  }
  .bed-preview-details {
    text-align: left;
    align-self: flex-start;
    margin-left: 15px;
  }
  .carousel-img {
    width: 200px;
    height: 125px;
  }
  .chosen-bed-container {
    display: flex;
    height: 125px;
    div {
      text-align: left;
      margin-left: 10px;
      color: #222222;
      position: relative;
      height: 100%;
      b {
        font-family: $main-font-bold;
        font-size: 18px;
      }
      p {
        font-family: $main-font-light;
        margin: 0;
        font-size: 14px;
      }
      span {
        font-family: $main-font-bold;
        position: absolute;
        bottom: 0;
      }
    }
    &:hover {
      text-decoration: none;
    }
  }
}
.el-icon-circle-close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px;
  font-size: 22px;
  cursor: pointer;
}
.map-container {
  height: 100%;
  width: $container;
  margin: auto;
}
@media (max-width: 600px) {
  .map-container {
    width: 80%;
  }
}
</style>
