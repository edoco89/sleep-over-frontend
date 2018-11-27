<template>
  <section>
    <div class="main-view">
      <input type="text" placeholder="Search for a bed here..." v-model="filterByCountry">
      <router-link tag="button" to="/searchResult" @click.native="setFilterByCountry">Search</router-link>
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