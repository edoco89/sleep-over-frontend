<template>
  <section>
    <div class="form-container mild-border">
      <span>Full Name
        <input type="text" v-model="user.fullname">
      </span>
      <!-- <span>Email  <input type="email" v-model="user.email" name id :placeholder="user.email"> </span>   -->
      <!-- <span>Password <input type="text"> </span> 
      <span> Password verification <input type="text"></span>-->
      <div class="select is-multiple">
        Hobbies
        <select v-model="user.hobbies" multiple size="8">
          <option value="sports">Sports</option>
          <option value="food">Food</option>
          <option value="bars">Bars</option>
          <option value="chill">Chill</option>
          <option value="books">Books</option>
          <option value="cinema">Cinema</option>
          <option value="travel">Travel and hiking</option>
          <option value="kids">Kids</option>
          <option value="musicals">Musicals and theater</option>
          <option value="rock">Rock</option>
          <option value="javascript">Javascript</option>
        </select>
        Languages
        <select v-model="user.languages" multiple size="8">
          <option value="english">English</option>
          <option value="hebrew">Hebrew</option>
          <option value="swahili">Swahili</option>
          <option value="french">French</option>
          <option value="spanish">Spanish</option>
          <option value="romanian">Romanian</option>
          <option value="chinese">Chinese</option>
          <option value="japanese">Japanese</option>
          <option value="thai">Thai</option>
          <option value="portugese">Portugese</option>
          <option value="russian">Russian</option>
        </select>
      </div>
      <span>About me
        <textarea v-model="user.aboutMe"></textarea>
      </span>
      <span>Age
        <input type="number" v-model="user.age">
      </span>
      <span>
        <div class="control">
          Gender
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
    }
  },
  computed: {
    user() {
      return this.$store.getters.loggedInUser;
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
    saveUser() {
      console.log("save user func", this.user);
      if (this.user.age) {
        this.$store.dispatch({ type: "saveUser", todo: this.user }).then(_ => {
          // this.$router.push('/userProfile')
        });
        // .catch(_=> {
        //     EventBusService.$emit(SHOW_MSG, {txt: 'Could not save Todo', type: 'danger'})
        // })
      }
      // else {
      //     EventBusService.$emit(SHOW_MSG, {txt: 'No user to save!', type: 'danger'})
      // }
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
