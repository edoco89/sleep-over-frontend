<template>
  <section>
    <img class="main-view">
    <div class="main-banner mild-border">
      <div class="main-banner-text">
        <div class="summary-standout">
          Thousands of hosts
          around the world
          <br>
        </div>
        <div class="secondary-header">
          A social community offering sleep accomodations
          with verified users and great guests
        </div>
      </div>
    </div>
    <div class="search-bar">
      <GmapAutocomplete placeholder="Search for a bed here..." @place_changed="setPlace" required></GmapAutocomplete>
      <router-link
        class="homepage-search"
        tag="button"
        to="/searchResult"
        @click.native="setFilterByLocation"
      >SEARCH</router-link>
    </div>

    <div class="catg-title">Find Your Kind Of People..</div>
    <div class="people-images">
      <div class="host-catg1">
        <div
          :class="'catg-hover ' + catg1"
          @mouseover="catg1 = 'show-catg'"
          @mouseout="catg1 = ''"
        >Sport</div>
        <img src="@/assets/img/sports.jpg" alt="Sport">
      </div>
      <div class="host-catg2">
        <div
          :class="'catg-hover ' + catg2"
          @mouseover="catg2 = 'show-catg'"
          @mouseout="catg2 = ''"
        >Outdoors</div>
        <img src="@/assets/img/outdoors.jpg" alt="Sport">
      </div>
      <div class="host-catg3">
        <div
          :class="'catg-hover ' + catg3"
          @mouseover="catg3 = 'show-catg'"
          @mouseout="catg3 = ''"
        >Out Going</div>
        <img src="@/assets/img/party.jpg" alt="Sport">
      </div>
      <div class="host-catg4">
        <div
          :class="'catg-hover ' + catg4"
          @mouseover="catg4 = 'show-catg'"
          @mouseout="catg4 = ''"
        >Foodies</div>
        <img src="@/assets/img/foodies.jpg" alt="Sport">
      </div>
    </div>

    <div class="ido-sentence">Connecting people around the world</div>

    <div class="world-images-container">
      <div class="kosamui mild-shadow mild-border">Try the beaches of
        <br>Ko Samui
      </div>
      <div class="santorini mild-shadow mild-border">Visit the beautiful Santorini</div>
      <div class="tuscany mild-shadow mild-border">Hosts in breathtaking Tuscany</div>
    </div>
    <!-- </img> -->
  </section>
</template>


<script>
// @ is an alias to /src

export default {
  data() {
    return {
      place: {},
      catg1: "",
      catg2: "",
      catg3: "",
      catg4: ""
    };
  },
  methods: {
    setFilterByLocation() {
      this.$store.dispatch({
        type: "setPlace",
        place: JSON.parse(JSON.stringify(this.place))
      });
    },
    setPlace(place) {
      place.geometry.location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      this.place = JSON.parse(JSON.stringify(place));
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.main-banner {
  margin-top: -25px;
  background-image: url("../assets/img/balcony-seat.jpg");
  background-size: cover;
  color: white;
  // background-repeat: no-repeat;
  background-position: top;
  border: none;
  height: 320px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  font-family: $main-font-bold;
  text-align: left;

  .main-banner-text {
    width: $container;
    margin: 15px auto;
    .summary-standout {
      font-size: 25px;
      width: 250px;
    }
    .secondary-header {
      font-size: 18px;
      width: 200px;
    }
  }
}

.search-bar {
  margin: 0 auto;
  padding-right: 45px;
  border-bottom: 1px solid $border-color;
  padding: 10px;
  background: #222222;
  input {
    margin: 5px;
    padding: 10px;
    border: none;
  }
}

input {
  border-radius: 4px;
  padding: 10px;
  width: 270px;
  font-family: $main-font-light;
  font-size: 1rem;
}

.homepage-search {
  padding: 10px;
  color: white;
  border-radius: 4px;
  border: 0px;
  background: rgb(117, 51, 51);
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}

.main-view {
  background-image: url();
}

.ido-sentence {
  margin: 40px 0;
  font-family: $main-font-bold;
  font-weight: bold;
  font-size: 1.8rem;
}

.people-images {
  width: $container;
  margin: auto;
  display: grid;
  grid-gap: 5px;
  // grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 55px 55px 55px 55px;
  color: $text-color-cards;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: $main-font-bold;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

.catg-title {
  text-align: left;
  width: $container;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 10px;
  font-family: $main-font-bold;
  font-size: 20px;
}

.catg-hover {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  color: black;
  font-size: 25px;
  background: rgba(128, 128, 128, 0.603);
  opacity: 0;
  transition: 0.4s;
}
.show-catg {
  opacity: 1;
  cursor: pointer;
}
.host-catg1 {
  position: relative;
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 4;
  img {
    object-position: bottom;
  }
}

.host-catg2 {
  position: relative;
  grid-row-start: 3;
  grid-row-end: -1;
  grid-column-start: 1;
  grid-column-end: 3;
  img {
    object-position: top;
  }
}

.host-catg3 {
  position: relative;
  grid-row-start: 3;
  grid-row-end: -1;
}

.host-catg4 {
  position: relative;
  grid-row-start: 1;
  grid-row-end: -1;
  grid-column: 4;
}

.world-images-container {
  width: $container;
  margin: auto;
  justify-content: space-between;
  display: flex;
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  text-shadow: 0.8px 0.8px black;
  font-family: $main-font-light;

  div {
    height: 240px;
    width: 30%;
    cursor: pointer;
    transition: all 0.2s;
  }
  .kosamui {
    background-image: url("../assets/img/kosamui.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }

  .santorini {
    background-image: url("../assets/img/Santorini.jpg");
    background-size: cover;
    margin: 0 10px;
    background-repeat: no-repeat;
  }

  .tuscany {
    background-image: url("../assets/img/tuscany.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }

  div:hover {
    opacity: 0.8;
    box-shadow: 1px 1px;
    transform: scale(1.02);
  }
}
@media (min-width: 550px) {
  // .main-banner {
  //   height: 400px;
  // }
  .people-images {
    grid-template-rows: 75px 75px 75px 75px;
  }
}
@media (min-width: 900px) {
  .main-banner {
    height: 400px;
  }
  .people-images {
    grid-template-rows: 85px 85px 85px 85px;
  }
}
@media (min-width: 1050px) {
  .main-banner {
    height: 500px;
  }
  .people-images {
    grid-template-rows: 100px 100px 100px 100px;
  }
}
</style>