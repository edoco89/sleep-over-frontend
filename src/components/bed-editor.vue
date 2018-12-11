<template>
  <section v-if="bed">
    <h3>{{mode}} Bed</h3>
    <section class="bed-editor">
      <form @submit.prevent="addBed">
        <div>
          Bed Location:
          <span v-if="mode === 'Edit'">{{bed.location.address}}</span>
          <GmapAutocomplete
            v-if="mode === 'Add'"
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
              <label for="file">Choose a file</label>
            </div>
            <div>
              <button type="submit">Add Image</button>
            </div>
          </form>
        </div>

        <div>Amenities:
          <select-menu
            v-if="(mode === 'Edit')? bed.location.coords.coordinates.length > 0: true"
            :set="bed.ameneties"
            opt="amenities"
            @setFilter="setAmenities"
          ></select-menu>
        </div>
        <button>{{mode}} Bed</button>
      </form>
      <div class="uploaded-imgs">
        <photo-carusel v-if="bed.imgUrls.length > 0" class="user-photo-carusel" :pics="bed.imgUrls"></photo-carusel>
        <img class="no-img" v-else src="@/assets/img/no-img.jpg" alt="No Images">
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
        rating: (Math.random() + 4).toFixed(2),
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
      //set all to false
      for (let catg in this.bed.ameneties) {
        this.bed.ameneties[catg] = false;
      }
      //set marked aments
      amen.forEach(amenity => (this.bed.ameneties[amenity] = true));
    }
  },
  created() {
    if (this.$route.params.bedId) {
      this.$store
        .dispatch("getBedById", { bedId: this.$route.params.bedId })
        .then(bed => {
          this.bed = JSON.parse(JSON.stringify(this.$store.getters.getCurrBed));
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
  font-family: $main-font-bold;
}
h3 {
  font-family: $main-font-bold;
  font-size: 32px;
  width: 90%;
  margin: auto;
  text-decoration: underline;
  margin-bottom: 10px;
  text-align: left;
}
.user-photo-carusel {
  height: 350px;
}
form {
  width: 50%;
  div {
    margin-right: 10px;
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;
  }
  button {
    cursor: pointer;
    border-radius: 4px;
    border: none;
    padding: 5px;
    background: #222222;
    color: white;
  }
  input {
    width: 200px;
    padding: 5px;
  }
}
.publish-form {
  display: flex;
  width: 280px;
  justify-content: space-between;
  div {
    input {
      opacity: 0;
      overflow: hidden;
      position: absolute;
      width: 100px;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
    label {
      cursor: pointer;
      background: #222222;
      padding: 5px;
      color: white;
      border-radius: 5px;
      font-size: 14px;
    }
  }
  button {
    cursor: pointer;
    height: 32.5px;
    width: 100px;
    font-size: 14px;
    border-radius: 5px;
    border: none;
  }
}

.uploaded-imgs {
  width: 50%;
  .no-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
