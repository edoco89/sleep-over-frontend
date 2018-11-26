<template>
    <section>
        <bed-list :beds="beds"></bed-list>
    </section>
</template>

<script>
import bedList from '@/components/bed-list.vue'

export default {
computed: {
beds(){
    return this.$store.getters.getBeds
}
},
components: {
    bedList
}
}
</script>

<style>

</style>
