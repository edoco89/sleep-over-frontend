<template>
  <section>
    <!-- @click="showModal" -->
    <div :class="{'is-active' : showModal}" class="modal">
      <div class="modal-background" @click="$emit('closeModal')"></div>
      <div class="modal-content">
        <h2>
          <span>SleepOver</span>
          {{formType}}
        </h2>
        <form @submit.prevent="setUser">
          <div v-if="formType === 'Join'">
            <b>Full Name:</b>
            <input
              v-model="user.fullname"
              type="text"
              name="fullname"
              required
              placeholder="Your Name"
            >
          </div>
          <div>
            <b>Email:</b>
            <input v-model="user.email" type="email" name="email" required placeholder="Email">
          </div>
          <div>
            <!-- SET VALIDATION! -->
            <b>Password:</b>
            <input v-model="user.password" type="password" required name="pass">
          </div>
          <div v-if="formType === 'Join'">
            <!-- v-validate -->
            <b>Verify Password:</b>
            <input type="password">
          </div>
          <button>{{formType}}</button>
          <a href="#" @click="changeForm">{{(formType === 'Login')? 'Join': 'Login'}}</a>
        </form>
      </div>
      <button @click="$emit('closeModal')" class="modal-close is-large" aria-label="close"></button>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    showModal: Boolean
  },
  data() {
    return {
      formType: "Login",
      user: {
        email: "",
        password: "",
        fullname: ""
      }
    };
  },
  methods: {
    async setUser() {
      if (this.formType === "Login") {
        await this.$store.dispatch("checkLogin", { user: this.user })
      } else {
        await this.$store.dispatch("addUser", { user: this.user })
      }
     this.$emit('closeModal')
    },
    changeForm() {
      this.formType === "Login"
        ? (this.formType = "Join")
        : (this.formType = "Login");
    }
  },
  computed: {
    getUser() {
      return JSON.parse(JSON.stringify(this.$store.getters.loggedInUser));
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";
.modal-content {
  width: 100%;
  border-radius: 15px;
  h2 {
    background: brown;
    color: white;
    padding: 10px;
    font-family: $main-font-bold;
    span {
      font-family: pacifico;
    }
  }
  form {
    width: 85%;
    margin: auto;
    div {
      font-size: 15px;
      padding: 10px;
      display: flex;
      text-align: left;
      justify-content: space-between;
      margin: 8px;
      input {
        padding: 5px;
        max-height: 36px;
      }
    }
    button {
      background: brown;
      color: white;
      border: none;
      padding: 7px;
      border-radius: 5px;
      margin-bottom: 10px;
      font-family: $main-font-bold;
      &:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
    a {
      font-style: italic;
      margin-left: 10px;
    }
  }
}

@media (min-width: 400px) {
  .modal-content {
    width: 400px;
  }
}
</style>
