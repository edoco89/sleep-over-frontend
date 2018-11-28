<template>
  <section>
    <div class="main-view">
      <input type="text" placeholder="Search for a bed here..." v-model="filterByCountry">
      <router-link tag="button" to="/searchResult" @click.native="setFilterByCountry">Search</router-link>
<div class="cookie-font logos"> Sleepover (cookie) </div>
<div class="courgette-font logos"> Sleepover (courgette) </div>
<div class="dancing-font logos"> Sleepover (dancing)</div>
<div class="gloria-font logos"> Sleepover (gloria) </div>
<div class="handlee-font logos"> Sleepover (handlee) </div>
<div class="patrick-font logos"> Sleepover (patrick) </div>
<div class="logo logos"> Sleepover (pacifico) </div>

    </div>
  </section>
</template>


<script>
// @ is an alias to /src


export default {
  data() {
    return {
      filterByCountry: ''
    }
  },
methods: {
  setFilterByCountry(){
    this.$store.dispatch({ type: 'setFilterByCountry', filterByCountry: this.filterByCountry })
  }
}
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_vars.scss';
.main-view{
  background-image: url()
}


</style>