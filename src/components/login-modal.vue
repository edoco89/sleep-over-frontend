<template>
  <section :class="'modal-login' + show">
    <h1>{{formType}}</h1>
    <form @submit.prevent="setUser">
      Email:
      <input v-model="user.email" type="email" name="email">
      Password:
      <input v-model="user.pass" type="password" name="pass">
      <button>{{formType}}</button>
    </form>
    <button @click="changeForm">{{(formType === 'Login')? 'Sign up': 'Login'}}</button>
  </section>
</template>
<script>
export default {
  props: {
    show: String
  },
  data() {
    return {
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
        this.$store.dispatch("checkLogin", { user: this.user });
      } else {
        this.$store.dispatch("addUser", { user: this.user });
      }
    },
    changeForm() {
      this.formType === "Login"
        ? (this.formType = "Sign up")
        : (this.formType = "Login");
    }
  }
};
</script>

<style scoped lang="scss">
.modal-login {
  height: 100px;
  background: blue;
  position: relative;
  bottom: 400px;
}
.open-modal {
  transform: translateY(500px);
}
</style>
