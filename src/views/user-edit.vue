<template>
  <section>
    <div class="form-container mild-border">
      <span>
        Full Name
        <input type="text" v-model="user.fullname">
      </span>
     
      <div class="checkbox-container">
         <span class="header-edit"> Hobbies </span>
      <el-checkbox-group v-model="checkList">
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

      <div class="select is-multiple">
       <span class="header-edit">  Languages </span>
        <el-checkbox-group v-model="langCheckList" multiple size="8">
          <el-checkbox label="english">English</el-checkbox>
          <el-checkbox label="hebrew">Hebrew</el-checkbox>
          <el-checkbox label="swahili">Swahili</el-checkbox>
          <el-checkbox label="french">French</el-checkbox>
          <el-checkbox label="spanish">Spanish</el-checkbox>
          <el-checkbox label="romanian">Romanian</el-checkbox>
          <el-checkbox label="chinese">Chinese</el-checkbox>
          <el-checkbox label="japanese">Japanese</el-checkbox>
          <el-checkbox label="thai">Thai</el-checkbox>
          <el-checkbox label="portugese">Portugese</el-checkbox>
          <el-checkbox label="russian">Russian</el-checkbox>
        </el-checkbox-group>
      </div>
      </div>
      <span>
      <span class="header-edit">About me</span>  
        <textarea v-model="user.aboutMe"></textarea>
      </span>
      <span>
       <span class="header-edit">  Age </span>
        <input type="number" v-model="user.age">
      </span>
      <span>
        <div class="control flex-row">
         <span class="header-edit">  Gender </span>
          <label class="radio">
            <input type="radio" name="female">
            Female
          </label>
          <label class="radio">
            <input type="radio" name="male">
            Male
          </label>
          <label class="radio">
            <input type="radio" name="fluid">
            Not binary
          </label>
        </div>
      </span>

      <div class="field upload-image">
        <div class="file is-info has-name">
          <label class="file-label flex-row">
            <input class="file-input" type="file" name="resume">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              
              <span class="file-label">Upload Image...</span>
            </span>
            <span class="file-name">Image file</span>
          </label>
        </div>
      </div>

      <!-- image upload -->
      <router-link exact :to="'/bed/edit/' + bed._id">Add Hosting Accomodations</router-link>

      <button @click="saveUser" class="danger-button">Save Changes</button>
    </div>
  </section>
</template>

<script>
export default {
  created() {
    const userId = this.$route.params.userId;
    if (userId) {
      this.$store.dispatch({ type: "getUserById", userId });
      // this.checkList 
    }
  },
 
  computed: {
    user() {
      return JSON.parse(JSON.stringify(this.$store.getters.loggedInUser));
    }
  },
  data() {
    return {
      bed: {
        _id: 67
      },
      checkList: ["Food", "Sports", "Javascript"],
      langCheckList: ["English", "Russian"]
    };
  },
  methods: {
    saveUser() {
      if (this.user.age) {
        this.$store.dispatch({ type: "saveUser", user: this.user }).then(_ => {
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

* {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

section {
  width: $container;
  display: flex;
  flex-direction: column;
  background-color: $bg-color;
}

button {
  margin: 10px;
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
