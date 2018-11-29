<template>
  <section>
    <div class="main-view">
      <div class="people-images">
        <div class="small-box">
          <span>People</span>
          <img src="/img/friends-sofa.jpg" title="Friends on sofa">
        </div>
      </div>
      <div class="search-bar">
        <primary-search @setSearch="setSearch"></primary-search>
        <router-link
          class="homepage-search"
          tag="button"
          to="/searchResult"
          @click.native="setFilterByCountry"
        >🔎</router-link>
      </div>

      <div class="ido-sentence">Connecting people around the world</div>

      <div class="world-images-container">
        <div class="kosamui">Try the beaches of
          <br>Ko Samui
        </div>
        <div class="santorini">Visit the beautiful Santorini</div>
        <div class="tuscany">Hosts in breathtaking Tuscany</div>
      </div>
    </div>
  </section>
</template>


<script>
// @ is an alias to /src
import primarySearch from "@/components/primary-search.vue";
export default {
  data() {
    return {
      filterByCountry: ""
    };
  },
  methods: {
    setFilterByCountry() {
      this.$store.dispatch({
        type: "setFilterByCountry",
        filterByCountry: this.filterByCountry
      });
    },
    setSearch(ev) {
      console.log("filter", ev);
    }
  },
  components: {
    primarySearch
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.search-bar {
  margin-top: 75px;
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
  display: flex;
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  text-shadow: 0.8px 0.8px black;
  font-family: $main-font-light;

  .small-box {
    border: 1px solid $border-color;
  }

  img {
    height: 120px;
  }

  div {
    height: 240px;
    width: 370px;
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