<template>
  <section>
    <div class="main-view">
      <div class="main-banner mild-border">
        <span class="summary-standout">Thousands of hosts
          <br>around the world
        </span>
        <span class="secondary-header">A social community offering sleep accomodations
          <br>with verified users and great guests
        </span>
      </div>

      <div class="search-bar">
       <GmapAutocomplete placeholder="Search for a bed here..." @place_changed="setPlace" required></GmapAutocomplete>
        <router-link
          class="homepage-search"
          tag="button"
          to="/searchResult"
          @click.native="setFilterByLocation">🔎</router-link>
          </div>

      <div class="people-images">
        <div class="small-box mild-shadow">
          <img src="/img/friends-sofa.jpg" alt="Food">
          <span>Foodies</span>
        </div>
        <div class="small-box mild-shadow">
          <img src="/img/friends-hang.jpg" alt="Sport">
          <span>Sport</span>
        </div>

        <div class="small-box mild-shadow">
          <img src="/img/friends-sofa.jpg" alt="Kids">
          <span>With kids</span>
        </div>

        <div class="small-box mild-shadow">
          <img src="/img/friends-hang.jpg" alt="Chill">
          <span>Chill</span>
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
    </div>
  </section>
</template>


<script>
// @ is an alias to /src
export default {
  data(){
    return {
      place: {}
    }
  },
  methods: {
    setFilterByLocation() {
      this.$store.dispatch({ type: "setPlace", place: JSON.parse(JSON.stringify(this.place))});
    },
    setPlace(place) {
      place.geometry.location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      this.place = JSON.parse(JSON.stringify(place));
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.main-banner {
  margin-top: 25px;
  background-image: url("../assets/img/ponder.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
  height: 320px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  font-family: $main-font-bold;
  text-align: left;

  .summary-standout {
    font-size: 2.1rem;
    margin-left: 20px;
  }

  .secondary-header {
    font-size: 1.4rem;
    margin-left: 20px;
  }
}

.search-bar {
  margin-top: 75px;
  padding-right: 45px;
  margin-left: 20px;
}

input {
  border-radius: 4px;
  padding: 10px;
  width: 270px;
  font-family: $main-font-light;
  font-size: 1rem;
}

.homepage-search {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
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
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  color: $text-color-cards;
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 0.8px 0.8px black;
  font-family: $main-font-bold;
  line-height: 90px;
  flex-wrap: wrap;
  justify-content: space-between;

  .small-box {
    border: 1px solid $border-color;
    border-radius: 4px;
    display: flex;
    align-items: center;
  }

  img {
    height: 90px;
  }

  span {
    margin-left: 8px;
    white-space: nowrap;
  }

  div {
    height: 90px;
    width: 320px;
    margin: 10px;
    cursor: pointer;
  }
}

.world-images-container {
  display: flex;
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  text-shadow: 0.8px 0.8px black;
  font-family: $main-font-light;

  div {
    height: 240px;
    width: 370px;
    margin: 10px;
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

  // img {
  //   height: 200px;
  //   display: inline;
  // }
}
</style>