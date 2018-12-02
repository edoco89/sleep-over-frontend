<template>
  <section>
    <!-- @click="showModal" -->
    <div :class="{'is-active' : showModal}" class="modal">
      <div class="modal-background" @click="$emit('closeModal')"></div>
      <div class="modal-content">
        <h1>{{'SleepOver ' + formType}}</h1>
        <form @submit.prevent="setUser">
          <div>
            <b>Email:</b>
            <input v-model="user.email" type="email" name="email">
          </div>
          <div>
            <b>Password:</b>
            <input v-model="user.pass" type="password" name="pass">
          </div>
          <button>{{formType}}</button>
          <span @click="changeForm">{{(formType === 'Login')? 'Join': 'Login'}}</span>
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
      // showModal: false,
      formType: "Login",
      user: {
        email: "",
        pass: ""
      }
    };
  },
  methods: {
    setUser() {
      if (this.formType === "Login") {
        this.$store.dispatch("checkLogin", { user: this.user }).then(() => {
          this.$emit("closeModal");
        });
      } else {
        this.$store.dispatch("addUser", { user: this.user });
      }
    },
    changeForm() {
      this.formType === "Login"
        ? (this.formType = "Join")
        : (this.formType = "Login");
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.loggedInUser;
    }
  }
};
</script>

<style scoped lang="scss">
.modal-content {
  width: 100%;
  form {
    width: 85%;
    margin: auto;
    div {
      font-size: 15px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      margin: 10px;
    }
    span,
    button {
      cursor: pointer;
      opacity: 0.8;
    }
  }
}

@media (min-width: 400px) {
  .modal-content {
    width: 400px;
  }
}
</style>
