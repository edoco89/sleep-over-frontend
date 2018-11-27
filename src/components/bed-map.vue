<template>
  <section v-if="beds">
    <GmapMap
      :center="currMapCenter"
      :zoom="16"
      map-type-id="terrain"
      style="width: 100%; height: 85vh"
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
    <section class="curr-location">
      <p>hello</p>
    </section>
  </section>
</template>

<script>
export default {
props:{
  beds:Array,
  default: []
},
data() {
    return {
      val: 0,
      currMapCenter: beds[0].location.coords
    };
  },
  methods:{
    showDetails(m,index){
      console.log('showing',m,index);
    }
  },
};
</script>

<style scoped lang="scss">
.switch-store {
display: flex;
div{
  padding: 10px;
  border: 2px solid black;
  margin:  10px;
  &:hover{
    cursor: pointer;
  }
}
}
</style>
