<template>
  <b-tabs v-if="user" class="profile-container">
    <b-tab card title="Your Guest Card" active>
      <profile-details :user="user"></profile-details>
    </b-tab>
    <b-tab card :title="(user.hostBeds.length === 0)? 'Become a Host':'Your Host Card'">
      <manage-beds></manage-beds>
    </b-tab>
  </b-tabs>
</template>

<script>
import profileDetails from "@/components/profile-details.vue";
import manageBeds from "@/components/manage-beds.vue";

export default {
  computed: {
    user() {
      return JSON.parse(JSON.stringify(this.$store.getters.loggedInUser));
    }
  },
  components: {
    profileDetails,
    manageBeds
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_vars.scss";

.profile-container {
  width: 90%;
  margin: auto;
  margin-top: 10px;
}
</style>
