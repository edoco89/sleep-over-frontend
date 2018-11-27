<template>
    <section>
        <!-- {{bed}} -->

        <h1> A {{bed.type}} in {{bed.location.city}} </h1>
        <h2> Stay with host </h2>
        <!-- <h3> Speaks: {{bed.languages.join(', ')}} </h3> -->

        <h2 class="bottom-bed-preview"> {{bed.rating}} </h2>


    </section>
</template>

<script>
export default {
    props: {
        bed: {
        type: Object,
        default: {}
        }
    },
    computed: {
        
        },
    }


</script>

<style>

</style>
