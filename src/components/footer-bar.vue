<template>
  <footer>
    <section>
     
      <div>
       Copy Rights 2018
      </div>
    </section>
  </footer>
</template>

<script>
export default {
methods:{
   
}
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_vars.scss';

* {
    font-family: $main-font-bold;
}

footer {
    height: 40px;
     background-color: $bg-color;
}

section{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: $container;
    height: inherit;
    margin: auto;
    height: 2.5rem;
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
