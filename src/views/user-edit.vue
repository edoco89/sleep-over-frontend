<template>
  <section>
      <p> user edit page </p>
  <span>Full Name</span>  <input type="text" v-model="user.fullname"><br>
<span>Email</span>    <input type="email" v-model="user.email" name id :placeholder="user.email"><br>

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
    },
   },
  data() {
    return {
    //   user: {
    //     fullname: "Amy Sherring",
    //     email: "ggg@gmail.com",
    //     password: "1234",
    //     hobbies: ["sport", "food"],
    //     languages: ["Russian", "English"],
    //     isHost: false,
    //     aboutMe: "I love to sing with friends",
    //     guestBadge: "",
    //     hostBadge: "",
    //     age: 25,
    //     gender: "Female",
    //     imgUrl:
    //       "https://pmcdeadline2.files.wordpress.com/2013/07/amyacker__130721002642.jpg",
    //     hostBedsId: "1",
    //     bedVisitedId: [],
    //     reviews: [],
    //     chatHistory: []
    //   }
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

section {
   width: $container;
}

</style>
