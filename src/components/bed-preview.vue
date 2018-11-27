<template>
<router-link :to="'/bed/' + bed._id">
  <section>
    <!-- {{bed}} -->
    <img :src="bed.imgUrl" :title="bed.hostId">
    <div class="text-preview">
        <h1>A {{bed.type}} in {{bed.location.city}}</h1>
        <h2>Stay with host</h2>
        <h3>Speaks: {{bed.languages.join(', ')}}</h3>
    </div>

    <h2 class="bottom-bed-preview">{{bed.rating}}</h2>
  </section>
  </router-link>
</template>

<script>
export default {
    props: {
        bed: {
        type: Object,
        default: {}
        }
    }
    }


</script>

<style  scoped lang="scss">

@import '@/assets/scss/_vars.scss';

section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: $container;
    height: inherit;
    margin: 10px auto;
    background-color: $bg-color-secondary;
    border-radius: 4px;
    padding: 10px;
    border: 1px solid $border-color;
    color: $text-color-cards;
}

img{
    height: 190px;
}


a {
    color: initial;
    text-decoration: initial;
}

.text-preview {
    flex-direction: column;
}

</style>
