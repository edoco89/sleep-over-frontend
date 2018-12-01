<template>
  <header>
    <section class="main-nav">
      <router-link to="/">
        <h1 class="logo">Sleepover</h1>
      </router-link>
      <div>
        <router-link to="/searchResult">Search</router-link>|
        <a @click="showModal">Login</a>
        <!-- <router-link to="/about">About </router-link>| -->
        <!-- <router-link to="/userProfile">Profile </router-link>| -->
      </div>
    </section>
    <login-modal :show="chosen"></login-modal>
  </header>
</template>

<script>
import loginModal from './login-modal.vue'
export default {
    data(){
        return{
            modalClass: ''
        }
    },
    computed:{
            chosen(){ return this.modalClass}
    },
methods:{
    showModal(){
        this. modalClass = ' open-modal';
        console.log('opened modal');
    },
},
    components:{
        loginModal
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_vars.scss';

.logo {
    font-size: 1.8rem;
}

header{
    background: $bg-color;
    height: 60px;
    color: $text-color;
    background-color: $nav-bg-color;
    border-bottom: 1px $border-color solid;
    position: fixed;
    top: 0;
    width: 100%;
}
h1{
    width: fit-content;
    margin: 0;
}
.main-nav{
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
