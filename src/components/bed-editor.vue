<template>
  <section v-if="bed">
    <h3>{{mode}} Bed</h3>
    <section class="bed-editor">
      <form @submit.prevent="addBed">
        <div>Bed Location:
          <GmapAutocomplete
            @place_changed="setPlace"
            required
            :placeholder="(mode==='Add')?'Where is your bed?': 'Bed set to previous location'"
          ></GmapAutocomplete>
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
          Your Hosting "Catch phrase":
          <input
            v-model="bed.catchPhrase"
            placeholder="Free candy for guests"
            type="text"
          >
        </div>
        <div>
          Ditstance from city center:
          <input v-model="bed.ditstanceFromCityCenter" type="text">
        </div>

        <div>Add Image:
          <form
            class="publish-form"
            action
            method="POST"
            enctype="multipart/form-data"
            @submit.prevent="saveImg"
          >
            <div>
              <input type="file" name="img">
            </div>
            <div>
              <button type="submit">Add Image</button>
            </div>
          </form>
        </div>

        <div>Amenities:
          <select-menu @setFilter="setAmenities"></select-menu>
        </div>
        <button>{{mode}}</button>
      </form>
      <div v-if="bed.imgUrls.length > 0" class="uploaded-imgs">
        <photo-carusel class="user-photo-carusel" :pics="bed.imgUrls"></photo-carusel>
        <!-- <img v-for="(img,idx) in bed.imgUrls" :key="idx" :src="img"> -->
      </div>
    </section>
  </section>
</template>

<script>
import selectMenu from "@/components/select-menu.vue";
import cloudinaryService from "@/services/cloudinary-service.js";
import photoCarusel from "@/components/photo-carousel.vue";

export default {
  data() {
    return {
      bedHost: null,
      prevLocation: null,
      mode: "",
      bed: {
        hostId: "",
        hostName: "",
        catchPhrase: "",
        languages: [],
        imgUrls: [],
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
          Accessible: false,
          Wifi: false,
          Pets: false,
          "Air Conditioner": false,
          Shampoo: false,
          Parking: false,
          "Children Ok": false
        }
      }
    };
  },
  computed: {
    address() {
      return this.bed.location.address;
    }
  },
  methods: {
    saveImg(ev) {
      ev.preventDefault();
      cloudinaryService.uploadImg(ev.target, ev).then(img => {
        this.bed.imgUrls.push(img.url);
        console.log(this.bed);
      });
    },
    setPlace(place) {
      this.bed.location.coords.coordinates = [
        place.geometry.location.lng(),
        place.geometry.location.lat()
      ];
      this.bed.location.address = place.formatted_address;
    },
    addBed() {
      this.$store
        .dispatch("saveBed", { bed: this.bed, user: this.bedHost })
        .then(res => {
          console.log("bed", res);
          this.$router.push(`/userProfile/${this.bed.hostId}`);
        });
    },
    setAmenities(amen) {
      amen.forEach(amenity => (this.bed.ameneties[amenity] = true));
    }
  },
  created() {
    if (this.$route.params.bedId) {
      this.$store
        .dispatch("getBedById", { bedId: this.$route.params.bedId })
        .then(bed => {
          this.bed = this.$store.getters.getCurrBed;
        });
      this.mode = "Edit";
    } else {
      this.mode = "Add";
    }
    this.bedHost = this.$store.getters.loggedInUser;
    this.bed.hostId = this.bedHost._id;
    this.bed.hostName = this.bedHost.fullname;
    this.bed.languages = this.bedHost.languages;
    this.bed.hostImg = this.bedHost.imgUrl;
  },
  components: {
    selectMenu,
    cloudinaryService,
    photoCarusel
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";
.bed-editor {
  width: $container;
  height: 350px;
  margin: auto;
  text-align: left;
  display: flex;
}
.user-photo-carusel {
  height: 350px;
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
.uploaded-imgs {
  width: 50%;
}
</style>
