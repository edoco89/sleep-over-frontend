<template>
  <section>
    <div class="search-bar">
      <input
        type="text"
        placeholder="Search for a bed here..."
        v-model="filter.byCountry"
        @input="$emit('setSearch',filter)"
      >
      <h3>
        Arrive
        <input
          v-model="filter.dateStart"
          type="date"
          required
          @input="$emit('setSearch', filter)"
        >
      </h3>
      <h3>
        Leave
        <input
          v-model="filter.dateEnd"
          type="date"
          required
          @input="$emit('setSearch', filter)"
        >
      </h3>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        byCountry: "",
        dateStart: "",
        dateEnd: ""
      }
    };
  }
};
</script>

<style>
</style>
