<template>
  <header>
    <section>
      <router-link to="/">
        <h1>Sleep-Over</h1>
      </router-link>
      <div>
        <router-link to="/searchResult">Search Result</router-link> |
        <a @click="LoginModal">Login</a>
        <!-- <router-link to="/">Home</router-link>| -->
        <!-- <router-link to="/about">About </router-link>| -->
        <!-- <router-link to="/userProfile">Profile </router-link>| -->
      </div>
    </section>
  </header>
</template>

<script>
export default {
methods:{
    LoginModal(){
        console.log('opened modal');
    }
}
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_vars.scss';

header{
    background: $bg-color;
    height: 60px;
    color: $text-color;
}
h1{
    width: fit-content;
    margin: 0;
}
section{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: $container;
    height: inherit;
    margin: auto;
}
div{
    width: fit-content;
    *{
        text-decoration: none;
        color: $text-color;
        div > *:hover{
            cursor: pointer;
            opacity: .8;
        }
    }
}
a{
    margin: 5px;
}
</style>
