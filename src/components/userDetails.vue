<template>
  <section>
    <h2>details!!!</h2>
    <!-- <img :src="user.imgUrl" alt="User image"> -->
    <b>{{user.fullname}}</b>
    <p>{{user.hostBadge}}</p>
    <b>{{user.age}}</b>
    <b>{{user.gender}}</b>
    <p>user.aboutMe</p>
    <ul>
      <li v-for="(hobbie,idx) in user.hubbies" :key="idx">{{hobbie}}</li>
    </ul>
    <p>{{user.languages.join(' ,')}}</p>
    <ul>
      <li v-for="(review,idx) in user.reviews" :key="idx">{{review}}</li>
    </ul>
    <!-- "hostBedsId": ["5bffe487001936be312de7d8"], -->
  </section>
</template>

<script>
export default {};
</script>

<style>
</style>
