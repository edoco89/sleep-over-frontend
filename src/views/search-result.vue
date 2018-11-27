<template>
    <section>
        <advanced-search> </advanced-search>
        <bed-list :beds="beds"></bed-list>
    </section>
</template>

<script>
import bedList from '@/components/bed-list.vue'
import advancedSearch from '@/components/advanced-search.vue'

export default {
computed: {
beds(){
    return this.$store.getters.getBeds
}
},
components: {
    bedList,
    advancedSearch
}
}
</script>

<style>

</style>
