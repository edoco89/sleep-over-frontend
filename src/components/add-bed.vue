<template>
  <section class="bed-editor">
    <h3>Add Bed</h3>
    <form @submit.prevent="addBed">
      <div>Bed Location:
        <GmapAutocomplete placeholder="Where is your bed" @place_changed="setPlace" required></GmapAutocomplete>
      </div>
      <div>
        You are offering A:
        <select v-model="bed.type" required>
          <option value="Couch">Couch</option>
          <option value="Room">Room</option>
          <option value="Entire Place">Entire Place</option>
        </select>
      </div>
      <div>
        Ditstance from city center:
        <input v-model="bed.ditstanceFromCityCenter" type="text">
      </div>
      <div>
        Add Image:
        <input type="text">
      </div>
      <div>Amenities:
        <select-menu @setFilter="setAmenities"></select-menu>
      </div>
      <button>Add</button>
    </form>
  </section>
</template>

<script>
import selectMenu from "@/components/select-menu.vue";
export default {
  data() {
    return {
      bed: {
        hostId: "",
        hostName: "",
        languages: [],
        imgUrls: [
          "https://a0.muscache.com/im/pictures/505bc60e-5bee-40ce-9972-8a166d997ea5.jpg?aki_policy=xx_large",
          "https://a0.muscache.com/im/pictures/505bc60e-5bee-40ce-9972-8a166d997ea5.jpg?aki_policy=xx_large"
        ],
        hostImg: "",
        location: {
          address: "",
          coords: {
            type: "Point",
            coordinates: []
          }
        },
        type: "",
        rating: 0,
        reviews: [],
        ditstanceFromCityCenter: 0,
        ameneties: {
          accessibility: false,
          wifi: false,
          acceptsPets: false,
          airConditioner: false,
          shampoo: false,
          parking: false,
          children: false
        },
        unAvailable: []
      }
    };
  },
  methods: {
    setPlace(place) {
      this.bed.location.coords.coordinates = [
        place.geometry.location.lng(),
        place.geometry.location.lat()
      ];
      this.bed.location.address = place.formatted_address;
    },
    addBed() {
      this.$store.dispatch("saveBed", { bed: this.bed });
    },
    setAmenities(amen) {
      amen.forEach(amenity => (this.bed.ameneties[amenity] = true));
    }
  },
  created() {
    const user = this.$store.getters.loggedInUser;
    this.bed.hostId = user._id;
    this.bed.hostName = user.fullname;
    this.bed.languages = user.languages;
    this.bed.hostImg = user.imgUrl;
  },
  components: {
    selectMenu
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";
.bed-editor {
  width: $container;
  margin: auto;
  text-align: left;
}
form {
  width: 50%;
  div {
    margin: 10px;
    display: flex;
    justify-content: space-between;
  }
  input {
    width: 150px;
    padding: 5px;
  }
}
</style>
