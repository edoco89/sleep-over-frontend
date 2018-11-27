<template>
  <section class="map-container">
    <GmapMap
      :center="currMapCenter"
      :zoom="16"
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
      isChosen: false,
      bedDetails: {},
      currMapCenter: this.beds[0].location.coords
    };
  },
  mounted() {
    // this.geolocate();
    mapService.getCoordsByAddress('arlozorov tel aviv')
    .then( data => this.currMapCenter = data.results[0].geometry.location)
  },
  methods:{
    showDetails(bed,index){
      this.isChosen = true;
        this.bedDetails ={
          img: '',
        title: `${bed.type} in ${bed.location.city}`,
        rating: bed.rating
      }
    },
    closeDetails(){
      this.isChosen = false;
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.currMapCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
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
