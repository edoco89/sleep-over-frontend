<template>
  <section v-if="user" class="editor-container">
    <form class="details-input">
      <h3>Edit your profile:</h3>
      <div>
        <b>Full Name</b>
        <input type="text" v-model="user.fullname">
      </div>
      <div>
        <b>Catch Phrase</b>
        <input type="text" v-model="user.catchPhrase">
      </div>
      <div>
        <b>Laguages:</b>
        <select-menu
          class="select-menu"
          :set="user.languages"
          opt="languages"
          @setFilter="setLanguages"
        ></select-menu>
      </div>
      <div>
        <b>Interests:</b>
        <select-menu
          class="select-menu"
          :set="user.interests"
          opt="interests"
          @setFilter="setInterests"
        ></select-menu>
      </div>

      <div>
        <b>About Me</b>
        <textarea v-model="user.aboutMe"></textarea>
      </div>
      <div>
        <b>Age</b>
        <input type="number" v-model="user.age">
      </div>
      <div class="gender-picker">
        <div>
          <b>Gender:</b>
        </div>
        <div>
          <label>
            <input
              :checked="user.gender === 'female'"
              @click="femaleClicked"
              type="radio"
              name="type"
            >
            Female
          </label>
          <label>
            <input :checked="user.gender === 'male'" @click="maleClicked" type="radio" name="type">
            Male
          </label>
          <label>
            <input :checked="user.gender === 'bi'" @click="biClicked" type="radio" name="type">
            Other
          </label>
        </div>
      </div>

      <div class="upload-image">
        <form
          class="publish-form"
          action
          method="POST"
          enctype="multipart/form-data"
          @submit.prevent="saveImg"
        >
          <input type="file" name="img">
          <button type="submit">Add Image</button>
        </form>
      </div>
      <button @click="saveUser" class="save-btn">Save Changes</button>
    </form>
    <section class="profile-pic">
      <img :src="user.imgUrl">
    </section>
  </section>
</template>

<script>
import cloudinaryService from "@/services/cloudinary-service.js";
import selectMenu from "@/components/select-menu.vue";

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
    setLanguages(lang) {
      lang.forEach(setLang => (this.user.languages[setLang] = true));
      console.log("lang", this.user.languages);
    },
    setInterests(int) {
      int.forEach(setInt => (this.user.interests[setInt] = true));
    },
    saveImg(ev) {
      ev.preventDefault();
      cloudinaryService.uploadImg(ev.target, ev).then(img => {
        delete this.user.imgUrl;
        this.user.imgUrl = img.url;
      });
    },
    saveUser() {
      this.$store.dispatch({ type: "saveUser", user: this.user }).then(res => {
        this.$router.push(`/userProfile/${this.user._id}`);
      });
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
    window.scrollTo(null, 0);
  },
  components: {
    selectMenu
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.gender-picker {
  label {
    width: 70px;
    margin-left: 10px;
    display: flex;
  }
}

.profile-pic {
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: top;
  }
}

.editor-container {
  width: 90%;
  margin: 15px auto;
  text-align: left;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
}

.select-menu {
  width: 150px;
  border: #222222;
}

.publish-form {
  display: flex;
}

.details-input {
  width: 100%;
  font-size: 12px;
  font-family: $main-font-light;
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    b {
      font-family: $main-font-bold;
      font-size: 13px;
    }
    input {
      width: 150px;
      border: 1px solid lightgray;
      padding: 5px;
      border-radius: 5px;
    }
    textarea {
      border: 1px solid lightgray;
      width: 150px;
      height: 50px;
    }
  }
  h3 {
    margin-top: 10px;
    font-size: 17px;
    text-decoration: underline;
    font-family: $main-font-bold;
  }
}

.publish-form {
  margin: 0;
  button {
    font-family: $main-font-bold;
    margin-left: 10px;
    border-radius: 5px;
    border: none;
    background: #222222;
    color: white;
    cursor: pointer;
  }
}

.save-btn {
  font-family: $main-font-bold;
  padding: 5px;
  border-radius: 5px;
  border: none;
  background: #222222;
  color: white;
  cursor: pointer;
}

@media (min-width: 500px) {
  .profile-pic {
    width: 100%;
    height: 350px;
    img {
      width: 100%;
      height: 350px;
    }
  }
}
@media (min-width: 600px) {
  .editor-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    height: 450px;
  }
  .profile-pic {
    width: 40%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .details-input {
    width: 60%;
    margin-left: 10px;
    font-size: 12px;
    font-family: $main-font-light;
  }
}
@media (min-width: 800px) {
  .editor-container {
    height: 470px;
  }
  .details-input {
    div {
      font-size: 16px;
      b {
        font-size: 16px;
      }
    }
  }
  .details-input {
    h3 {
      font-size: 18px;
    }
  }
}
@media (min-width: 1000px) {
  .editor-container {
    padding: 10px 25px;
    height: 500px;
  }

  .details-input {
    div {
      b {
        font-size: 18px;
      }
      input {
        width: 200px;
      }
      textarea {
        width: 200px;
      }
    }
    h3 {
      font-size: 22px;
    }
  }

  .select-menu {
    width: 200px;
  }
}
</style>
