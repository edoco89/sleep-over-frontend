<template>
  <section>
    <span>
      Full Name
      <input type="text" v-model="user.fullname">
    </span>
<span>
      Catch Phrase
      <input type="text" v-model="user.catchPhrase">
    </span>


    <div class="checkbox-container">
      <span class="header-edit">interest</span>
      <el-checkbox-group v-model="user.interest">
        <el-checkbox label="Sports"></el-checkbox>
        <el-checkbox label="Food"></el-checkbox>
        <el-checkbox label="Bars"></el-checkbox>
        <el-checkbox label="Chill"></el-checkbox>
        <el-checkbox label="Books"></el-checkbox>
        <el-checkbox label="Cinema"></el-checkbox>
        <el-checkbox label="Travel and Hiking"></el-checkbox>
        <el-checkbox label="Kids"></el-checkbox>
        <el-checkbox label="Musicals"></el-checkbox>
        <el-checkbox label="Rock"></el-checkbox>
        <el-checkbox label="Javascript"></el-checkbox>
      </el-checkbox-group>

      <div class>
        <span class="header-edit">Languages</span>
        <el-checkbox-group v-model="user.languages">
          <el-checkbox label="English">English</el-checkbox>
          <el-checkbox label="Hebrew">Hebrew</el-checkbox>
          <el-checkbox label="Swahili">Swahili</el-checkbox>
          <el-checkbox label="French">French</el-checkbox>
          <el-checkbox label="Spanish">Spanish</el-checkbox>
          <el-checkbox label="Romanian">Romanian</el-checkbox>
          <el-checkbox label="Chinese">Chinese</el-checkbox>
          <el-checkbox label="Japanese">Japanese</el-checkbox>
          <el-checkbox label="Thai">Thai</el-checkbox>
          <el-checkbox label="Portugese">Portugese</el-checkbox>
          <el-checkbox label="Russian">Russian</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <span>
      <span class="header-edit">About me</span>
      <textarea v-model="user.aboutMe"></textarea>
    </span>
    <span>
      <span class="header-edit">Age</span>
      <input type="number" v-model="user.age">
    </span>
    <span>
      <div class="control flex-row">
        <span class="header-edit">Gender</span>
        <label class="radio">
          <input
            :checked="user.gender === 'female'"
            @click="femaleClicked"
            type="radio"
            name="type"
          >
          Female
        </label>
        <label class="radio">
          <input :checked="user.gender === 'male'" @click="maleClicked" type="radio" name="type">
          Male
        </label>
        <label class="radio">
          <input :checked="user.gender === 'bi'" @click="biClicked" type="radio" name="type">
          Not binary
        </label>
      </div>
    </span>

    <div class="field upload-image">
      <div class="file is-info has-name">
        <label class="file-label flex-row">
          <input class="file-input" type="file" name="resume">
          <span class="file-cta"></span>
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
        </label>

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
    </div>

    <!-- image upload -->
    <router-link exact :to="'/bed/edit/' + bed._id">Add Hosting Accomodations</router-link>

    <button @click="saveUser" class="danger-button">Save Changes</button>
  </section>
</template>

<script>
import cloudinaryService from "@/services/cloudinary-service.js";

export default {
  computed: {
    user() {
      return JSON.parse(JSON.stringify(this.$store.getters.loggedInUser));
    }
  },
  data() {
    return {
      bed: {
        _id: 67
      }
    };
  },
  methods: {
    saveImg(ev) {
      ev.preventDefault();
      cloudinaryService.uploadImg(ev.target, ev).then(img => {
        this.user.imgUrl = img.url;
        console.log(this.user);
      });
    },
    saveUser() {
      this.$store.dispatch({ type: "saveUser", user: this.user })
      .then(res => {
         this.$router.push(`/userProfile/${this.user._id}`);
      })
    },
    femaleClicked() {
      this.user.gender = "female";
    },
    maleClicked() {
      this.user.gender = "male";
    },
    biClicked() {
      this.user.gender = "bi";
    }
  },
  mounted() {
    window.scrollTo(null, 0)
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

* {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: left;
}

section {
  width: $container;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: $bg-color;

  * {
    align-content: flex-start;
  }
}

button {
  margin: 10px;
}

textarea {
  width: 300px;
  height: 150px;
}

.control {
  margin: 10px 0;
}

.checkbox-container {
  display: flex;
  flex-direction: row;
}

.header-edit {
  font-weight: bold;
}

.marked {
  background-color: gray;
}

.upload-image {
  margin-top: 11px;
}

.file-label {
  line-height: 19px;
  margin-top: -11px;
}

.form-container {
  width: 96%;
  margin: 10px 0;
  align-self: center;
  background-color: white;
}
</style>
