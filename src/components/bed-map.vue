<template>
  <section class="map-container">
    <label>AutoComplete
      <GmapAutocomplete @place_changed="setPlace"></GmapAutocomplete>
      <button @click="usePlace">Add</button>
    </label>
    <GmapMap
      ref="map"
      :center="currMapCenter"
      :zoom="16"
      :options="mapStyle"
      map-type-id="terrain"
      style="width: 100%; height: 100%"
      @click="closeDetails"
    >
      <GmapMarker
        :key="index"
        v-for="(bed, index) in beds"
        :position="bed.location.coords"
        :clickable="true"
        :draggable="false"
        @click="showDetails(bed,index)"
      />
    </GmapMap>
    <button class="my-locatoin" @click="goToMyLocation">
      <img src="@/assets/img/my_location.png">
    </button>
    <section :class="chosenBed">
      <!-- <img> -->
      <b>{{bedDetails.title}}</b>
      <p>{{bedDetails.rating}}</p>
    </section>
  </section>
</template>

<script>
import mapService from '@/services/mapService.js'
export default {
  props: {
    beds: Array,
    default: []
},
data() { 
  return {
    mapStyle: {
 styles: [{
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#f4edb5"
      },
      {
        "saturation": 10
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ca6500"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#8db89c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]
},
    place: null,
    isChosen: false,
      bedDetails: {},
      currMapCenter: this.beds[0].location.coords
    };
  },
  mounted() {
    console.log(this.$refs.map);
  },
  methods:{
    goToMyLocation(){
     navigator.geolocation.getCurrentPosition(position => {
        this.currMapCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    showDetails(bed,index){
      this.isChosen = true;
        this.bedDetails ={
          img: '',
        title: `${bed.type} in ${bed.location.city}`,
        rating: bed.rating
      }
    },
     setPlace(place) {
      this.place = place
      console.log(place);
    },
     usePlace(place) {
      if (this.place) {
        this.currMapCenter = {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng(),
          }
        }
        this.place = null;
      },
    closeDetails(){
      this.isChosen = false;
    }
  },
  computed:{
    chosenBed(){
      if(this.isChosen) return 'chosen'
      else return 'not-chosen'
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_vars.scss';
.switch-store {
display: flex;
  div {
    padding: 10px;
    border: 2px solid black;
    margin:  10px;
    &:hover{
      cursor: pointer;
    }
  }
}
.not-chosen{
  position: absolute;
  bottom: -10px;
  height: 0px;
  width: $container;
  transition: .4s;
  *{
    height: 0;
    visibility: hidden;
  }
}
.my-locatoin{
    position: relative;
    width: 40px;
    height: 40px;
    top: -230px;
    left: -12px;
    border: none;
    padding: 5px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
    border-radius: 2px;
    float: right;
  &:hover{
    cursor: pointer;
    opacity: .85;
  }
  &:focus{
    outline: none;
  }
}
    .chosen {
      position: absolute;
      bottom: -10px;
      height: 100px;
      width: $container;
      background: gray;
      transition: .4s;
      *{
        height: fit-content;
      }
    }
  .map-container{
    height: 80vh;
    width: $container;
    margin: auto;
  }
</style>
