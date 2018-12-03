<template>
  <section>
    <h3>Add Bed</h3>Bed Location:
    <form @submit.prevent="addBed">
      <GmapAutocomplete placeholder="Search for a bed here..." @place_changed="setPlace" required></GmapAutocomplete>
      <br>Add Image:
      <input type="text">
      <button>Add</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      bed: {
        hostId: "5c02a7e99d2411003001ba79",
        hostName: "Michael Wong",
        languages: ["Hebrew", "English"],
        imgUrls: [
          "https://a0.muscache.com/im/pictures/505bc60e-5bee-40ce-9972-8a166d997ea5.jpg?aki_policy=xx_large",
          "https://a0.muscache.com/im/pictures/505bc60e-5bee-40ce-9972-8a166d997ea5.jpg?aki_policy=xx_large"
        ],
        hostImg:
          "https://pmcdeadline2.files.wordpress.com/2013/07/amyacker__130721002642.jpg",
        location: {
          address: "",
          coords: {
            type: "Point",
            coordinates: [34.7818, 32.0853]
          }
        }
      }
    };
  },
  methods: {
    setPlace(place) {
      this.bed.location.coords.coordinates = [
        place.geometry.location.lat(),
        place.geometry.location.lng()
      ];
      this.bed.location.address = place.formatted_address;
    },
    addBed() {
      this.$store.dispatch("saveBed", { bed: this.bed });
    }
  },
  created() {
    const user = this.$store.getters.loggedInUser;
    this.bed.hostId = user._id;
    this.bed.hostName = user.fullname;
    this.bed.languages = user.languages;
    this.bed.hostImg = user.imgUrl;
  }
};
</script>

<style scoped lang="scss">
</style>
