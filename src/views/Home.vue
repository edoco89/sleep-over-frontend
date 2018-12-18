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
      <GmapAutocomplete
        placeholder="Search for a bed here..."
        @place_changed="setPlace"
        required="place"
      ></GmapAutocomplete>
      <router-link
        class="homepage-search"
        tag="button"
        to="/searchResult"
        @click.native="setFilterByLocation"
      >SEARCH</router-link>
    </div>

    <div class="catg-title">We got you EVERYWHERE...</div>
    <div class="people-images">
      <div class="host-catg1" @click="selectedPlaces(telAviv)">
        <div
          :class="'catg-hover ' + catg1"
          @mouseover="catg1 = 'show-catg'"
          @mouseout="catg1 = ''"
        >Tel Aviv</div>
        <img src="@/assets/img/telAviv.png" alt="Tel Aviv">
      </div>
      <div class="host-catg2" @click="selectedPlaces(newYork)">
        <div
          :class="'catg-hover ' + catg2"
          @mouseover="catg2 = 'show-catg'"
          @mouseout="catg2 = ''"
        >New York</div>
        <img src="@/assets/img/newYork.jpg" alt="New York">
      </div>
      <div class="host-catg3" @click="selectedPlaces(rome)">
        <div
          :class="'catg-hover ' + catg3"
          @mouseover="catg3 = 'show-catg'"
          @mouseout="catg3 = ''"
        >Rome</div>
        <img src="@/assets/img/rome.jpg" alt="Rome">
      </div>
      <div class="host-catg4" @click="selectedPlaces(london)">
        <div :class="'catg-hover ' + catg4" @mouseover="catg4 = 'show-catg'" @mouseout="catg4 = ''">
          <b>London</b>
        </div>
        <img src="@/assets/img/london.jpg" alt="London">
      </div>
    </div>

    <div class="catg-title">Connecting people around the world</div>

    <div class="people-container">
      <div class="people1">
        <img src="@/assets/img/ron-wendy.jpg" alt>
        <div>
          <b>Ron & Wendy, Berlin</b>
          <p>
            The loveley couple offers an
            <b>Entire Comfortable Room!</b>
          </p>
          <router-link to="/bed/5c08f6f5a336a33a6c60d27c" href="#">Check it Out!</router-link>
        </div>
      </div>

      <div class="people2">
        <img src="@/assets/img/john.jpeg" alt>
        <div>
          <b>Dvir, Tel-Aviv</b>
          <p>
            <b>Explore</b> TLV like a local
          </p>
          <router-link to="/bed/5c0facb98806c902dc81f5f9" href="#">Check it Out!</router-link>
        </div>
      </div>
      <div class="people3">
        <img src="@/assets/img/zoey.jpeg" alt>
        <div>
          <b>Zoey, London</b>
          <p>
            Zoey is rated at our
            <b>Top 5</b> hosts in London!
          </p>
          <router-link to="/bed/5c0faf808806c902dc81f5fb" href="#">Check it Out!</router-link>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import mapService from "@/services/map.service.js";

export default {
  data() {
    return {
      place: null,
      catg1: "",
      catg2: "",
      catg3: "",
      catg4: "",
      telAviv: {
        address_components: [
          {
            long_name: "Tel Aviv-Yafo",
            short_name: "Tel Aviv-Yafo",
            types: ["locality", "political"]
          },
          {
            long_name: "Tel Aviv District",
            short_name: "Tel Aviv District",
            types: ["administrative_area_level_1", "political"]
          },
          {
            long_name: "Israel",
            short_name: "IL",
            types: ["country", "political"]
          }
        ],
        adr_address:
          '<span class="locality">Tel Aviv-Yafo</span>, <span class="country-name">Israel</span>',
        formatted_address: "Tel Aviv-Yafo, Israel",
        geometry: {
          location: {
            lat: 32.0852999,
            lng: 34.78176759999997
          },
          viewport: {
            south: 32.029252,
            west: 34.742515899999944,
            north: 32.146611,
            east: 34.8519761
          }
        },
        icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
        id: "78708c592bddf3a50b3a14a24024728d4fa8a31d",
        name: "Tel Aviv-Yafo",
        photos: [
          {
            height: 3264,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/108909779665263407420/photos">Oleg Babich</a>'
            ],
            width: 4928
          },
          {
            height: 3840,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/117009792044813036647/photos">Gabe Bin</a>'
            ],
            width: 2160
          },
          {
            height: 3216,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/111838019904366548449/photos">איב לזרוב</a>'
            ],
            width: 4288
          },
          {
            height: 960,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/117306889785691401732/photos">מרינה שקרוב</a>'
            ],
            width: 1703
          },
          {
            height: 4128,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/106800621177355677550/photos">דודו חוגג</a>'
            ],
            width: 3096
          },
          {
            height: 1152,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/112338686538562542925/photos">Aldis Siu</a>'
            ],
            width: 2048
          },
          {
            height: 2988,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/103611520045186372298/photos">zeav barad</a>'
            ],
            width: 5312
          },
          {
            height: 2203,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/118396621758920590591/photos">Sirouch Petcherski</a>'
            ],
            width: 2933
          },
          {
            height: 2358,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/117311393447946448251/photos">Shimi</a>'
            ],
            width: 4192
          },
          {
            height: 2988,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/117306889785691401732/photos">מרינה שקרוב</a>'
            ],
            width: 4224
          }
        ],
        place_id: "ChIJH3w7GaZMHRURkD-WwKJy-8E",
        reference: "ChIJH3w7GaZMHRURkD-WwKJy-8E",
        scope: "GOOGLE",
        types: ["locality", "political"],
        url:
          "https://maps.google.com/?q=Tel+Aviv-Yafo,+Israel&ftid=0x151d4ca6193b7c1f:0xc1fb72a2c0963f90",
        utc_offset: 120,
        vicinity: "Tel Aviv-Yafo",
        html_attributions: []
      },
      london: {
        address_components: [
          {
            long_name: "London",
            short_name: "London",
            types: ["locality", "political"]
          },
          {
            long_name: "London",
            short_name: "London",
            types: ["postal_town"]
          },
          {
            long_name: "Greater London",
            short_name: "Greater London",
            types: ["administrative_area_level_2", "political"]
          },
          {
            long_name: "England",
            short_name: "England",
            types: ["administrative_area_level_1", "political"]
          },
          {
            long_name: "United Kingdom",
            short_name: "GB",
            types: ["country", "political"]
          }
        ],
        adr_address:
          '<span class="locality">London</span>, <span class="country-name">UK</span>',
        formatted_address: "London, UK",
        geometry: {
          location: {
            lat: 51.5073509,
            lng: -0.12775829999998223
          },
          viewport: {
            south: 51.38494009999999,
            west: -0.351468299999965,
            north: 51.6723432,
            east: 0.14827100000002247
          }
        },
        icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
        id: "b1a8b96daab5065cf4a08f953e577c34cdf769c0",
        name: "London",
        photos: [
          {
            height: 800,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/100576107799945331393/photos">Edu Sousa</a>'
            ],
            width: 1200
          },
          {
            height: 1200,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/114647298085396208768/photos">George Morina</a>'
            ],
            width: 1600
          },
          {
            height: 1920,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/113856488991850624540/photos">Franz Baernthaler</a>'
            ],
            width: 2560
          },
          {
            height: 1065,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/117641363844967821087/photos">Manuel Ligabue</a>'
            ],
            width: 1600
          },
          {
            height: 2136,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/110744511144480687702/photos">Nuno Martins</a>'
            ],
            width: 3216
          },
          {
            height: 2988,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/101774938509687678664/photos">Dean McBride</a>'
            ],
            width: 5312
          },
          {
            height: 1440,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/111849553513496073867/photos">Destiny Symonee</a>'
            ],
            width: 2560
          },
          {
            height: 809,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/117764516527474292201/photos">Alex Teixeira</a>'
            ],
            width: 1080
          },
          {
            height: 1200,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/107558291194371092406/photos">mahesh iyer</a>'
            ],
            width: 1600
          },
          {
            height: 2432,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/116068811719946413311/photos">Massimo Casati</a>'
            ],
            width: 4320
          }
        ],
        place_id: "ChIJdd4hrwug2EcRmSrV3Vo6llI",
        reference: "ChIJdd4hrwug2EcRmSrV3Vo6llI",
        scope: "GOOGLE",
        types: ["locality", "political"],
        url:
          "https://maps.google.com/?q=London,+UK&ftid=0x47d8a00baf21de75:0x52963a5addd52a99",
        utc_offset: 0,
        vicinity: "London",
        html_attributions: []
      },
      newYork: {
        address_components: [
          {
            long_name: "New York",
            short_name: "New York",
            types: ["locality", "political"]
          },
          {
            long_name: "New York",
            short_name: "NY",
            types: ["administrative_area_level_1", "political"]
          },
          {
            long_name: "United States",
            short_name: "US",
            types: ["country", "political"]
          }
        ],
        adr_address:
          '<span class="locality">New York</span>, <span class="region">NY</span>, <span class="country-name">USA</span>',
        formatted_address: "New York, NY, USA",
        geometry: {
          location: {
            lat: 40.7127753,
            lng: -74.0059728
          },
          viewport: {
            south: 40.4773991,
            west: -74.25908989999999,
            north: 40.9175771,
            east: -73.7002721
          }
        },
        icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
        id: "7eae6a016a9c6f58e2044573fb8f14227b6e1f96",
        name: "New York",
        photos: [
          {
            height: 403,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/109211857686808261282/photos">Вячеслав Сысоев</a>'
            ],
            width: 604
          },
          {
            height: 960,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/102857914442312897284/photos">Ela PRL</a>'
            ],
            width: 1280
          },
          {
            height: 1080,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/110161312347829694373/photos">Roisin McGarry</a>'
            ],
            width: 1080
          },
          {
            height: 1200,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/112712688507360495804/photos">Eva Rochovanska</a>'
            ],
            width: 1600
          },
          {
            height: 1365,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/112714959103005771392/photos">jr rodriguez moreno</a>'
            ],
            width: 2048
          },
          {
            height: 1200,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/101756899438274245298/photos">M. Cuff.</a>'
            ],
            width: 1599
          },
          {
            height: 839,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/102129736263579160251/photos">Geetha Manju</a>'
            ],
            width: 972
          },
          {
            height: 720,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/112013027724003686126/photos">Tzachi Cohen</a>'
            ],
            width: 1084
          },
          {
            height: 2448,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/108137452504235376202/photos">Kusal Epa</a>'
            ],
            width: 3696
          },
          {
            height: 1536,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/112714959103005771392/photos">jr rodriguez moreno</a>'
            ],
            width: 2048
          }
        ],
        place_id: "ChIJOwg_06VPwokRYv534QaPC8g",
        reference: "ChIJOwg_06VPwokRYv534QaPC8g",
        scope: "GOOGLE",
        types: ["locality", "political"],
        url:
          "https://maps.google.com/?q=New+York,+NY,+USA&ftid=0x89c24fa5d33f083b:0xc80b8f06e177fe62",
        utc_offset: -300,
        vicinity: "New York",
        html_attributions: []
      },
      rome: {
        address_components: [
          {
            long_name: "Metropolitan City of Rome",
            short_name: "RM",
            types: ["administrative_area_level_2", "political"]
          },
          {
            long_name: "Lazio",
            short_name: "Lazio",
            types: ["administrative_area_level_1", "political"]
          },
          {
            long_name: "Italy",
            short_name: "IT",
            types: ["country", "political"]
          }
        ],
        adr_address:
          '<span class="region">Metropolitan City of Rome</span>, <span class="country-name">Italy</span>',
        formatted_address: "Metropolitan City of Rome, Italy",
        geometry: {
          location: {
            lat: 41.90270080000001,
            lng: 12.496235200000001
          },
          viewport: {
            south: 41.407571,
            west: 11.733544199999983,
            north: 42.2960412,
            east: 13.296275400000013
          }
        },
        icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
        id: "2ce98948bf41a3e2b9f7e20b0160c8a555ab72c4",
        name: "Metropolitan City of Rome",
        photos: [
          {
            height: 3265,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/102080028982453701158/photos">Purnachandar Reddy Pylla</a>'
            ],
            width: 4898
          },
          {
            height: 3265,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/102080028982453701158/photos">Purnachandar Reddy Pylla</a>'
            ],
            width: 4898
          },
          {
            height: 1365,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/111760074495075381634/photos">Vladimír Ivanička</a>'
            ],
            width: 2048
          },
          {
            height: 3456,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/100554435706758891154/photos">Chui Danny</a>'
            ],
            width: 5184
          },
          {
            height: 3456,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/105218144663951779484/photos">Sara Biga</a>'
            ],
            width: 4608
          },
          {
            height: 1704,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/103252318570330742650/photos">Danny Sadeh</a>'
            ],
            width: 2272
          },
          {
            height: 3265,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/102080028982453701158/photos">Purnachandar Reddy Pylla</a>'
            ],
            width: 4898
          },
          {
            height: 3265,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/102080028982453701158/photos">Purnachandar Reddy Pylla</a>'
            ],
            width: 4898
          },
          {
            height: 3072,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/111760074495075381634/photos">Vladimír Ivanička</a>'
            ],
            width: 4608
          },
          {
            height: 3265,
            html_attributions: [
              '<a href="https://maps.google.com/maps/contrib/102080028982453701158/photos">Purnachandar Reddy Pylla</a>'
            ],
            width: 4898
          }
        ],
        place_id: "ChIJw0rXGxGKJRMRAIE4sppPCQM",
        reference: "ChIJw0rXGxGKJRMRAIE4sppPCQM",
        scope: "GOOGLE",
        types: ["administrative_area_level_2", "political"],
        url:
          "https://maps.google.com/?q=Metropolitan+City+of+Rome,+Italy&ftid=0x13258a111bd74ac3:0x3094f9ab2388100",
        utc_offset: 60,
        html_attributions: []
      }
    };
  },
  methods: {
    setFilterByLocation() {
      if (!this.place) {
        return this.$router.push('/');
      }
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
    },
    selectedPlaces(place) {
      this.place = JSON.parse(JSON.stringify(place));
      this.$store.dispatch({
        type: "setPlace",
        place: JSON.parse(JSON.stringify(this.place))
      });
      this.$router.push("/searchResult");
    }
  },
  mounted() {
    window.scrollTo(null, 0);
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
    padding: 12.5px;
    width: 55%;
    border: none;
    font-size: 22px;
    border: 1px solid white;
  }
  button {
    font-size: 25px;
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
  border: 1px solid white;
  font-family: $main-font-bold;
  background: rgb(177, 75, 75);
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
  font-size: 18px;
}

.catg-hover {
  position: absolute;
  z-index: 1;
  color: black;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  font-size: 18px;
  background: rgba(212, 206, 206, 0.603);
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

.people-container {
  width: $container;
  margin: auto;
  display: flex;
  justify-content: space-between;
  div {
    width: 32%;
    border: 1px solid $border-color;
    img {
      height: 60px;
      width: 100%;
      object-fit: cover;
      object-position: top;
    }
    div {
      position: relative;
      text-align: left;
      padding: 4px;
      width: 100%;
      border: none;
      padding-top: 10px;
      height: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      b {
        font-family: $main-font-bold;
        font-size: 12px;
      }
      p {
        font-family: $main-font-light;
        font-size: 10px;
        b {
          font-size: 10px;
          color: #6e6a6a;
        }
      }
      a {
        font-family: $main-font-light;
        font-size: 10px;
        font-weight: bold;
        font-style: italic;
        position: absolute;
        bottom: 0;
        padding-bottom: 8px;
      }
    }
  }
}
@media (min-width: 500px) {
  .catg-title {
    font-size: 20px;
  }
  .catg-hover {
    font-size: 25px;
    color: black;
  }
  .people-container {
    div {
      img {
        height: 105px;
      }
      div {
        padding: 6px;
        padding-top: 10px;
        height: 140px;
        b {
          font-family: $main-font-bold;
          font-size: 16px;
        }
        p {
          font-family: $main-font-light;
          font-size: 14px;
          b {
            font-size: 14px;
            color: #6e6a6a;
          }
        }
      }
    }
  }
  .people-images {
    grid-template-rows: 75px 75px 75px 75px;
  }
}
@media (min-width: 700px) {
  .people-container {
    div {
      img {
        height: 130px;
      }
      div {
        a {
          font-size: 14px;
        }
      }
    }
  }
}
@media (min-width: 900px) {
  .catg-title {
    font-size: 25px;
  }
  .search-bar {
    input {
      width: 35%;
    }
  }
  .catg-hover {
    font-size: 40px;
  }
  .people-container {
    div {
      img {
        height: 180px;
      }
      div {
        padding: 10px;
        padding-top: 10px;
        height: 140px;
        b {
          font-family: $main-font-bold;
          font-size: 20px;
        }
        p {
          font-family: $main-font-light;
          font-size: 17px;
          b {
            font-size: 18px;
            color: #6e6a6a;
          }
        }
      }
    }
  }
  .main-banner {
    height: 400px;
  }
  .people-images {
    grid-template-rows: 85px 85px 85px 85px;
  }
}
@media (min-width: 1050px) {
  .people-container {
    div {
      width: 30%;
      img {
        height: 200px;
      }
      div {
        a {
          font-size: 16px;
        }
      }
    }
  }
  .main-banner {
    height: 500px;
  }
  .catg-hover {
    font-size: 50px;
  }
  .people-images {
    grid-template-rows: 100px 100px 100px 100px;
  }
}
</style>