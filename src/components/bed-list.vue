

<template>
<section>
<bed-preview v-for="bed in beds" :bed="bed" :key="bed.id"></bed-preview>
</section>
    
</template>

<script>
import bedPreview from '@/components/bed-preview.vue'
export default {
props: {
    beds: {
    type: Array,
    default: []
    }
},
components: {
    bedPreview
}
}
</script>

<style>

</style>
