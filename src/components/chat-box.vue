<template>
    <section>
        <p v-for="msg in chat.messages" :key="msg.timestamp">{{msg}}</p>
        <input type="text" v-model="currMsg.txt">
        <button @click="sendMsg">SEND</button>
    </section>
</template>

<script>
export default {
    data(){
        return {
            currMsg: {
                from: '', 
                to: '',
                txt: '', 
                timestamp: Date.now()
                }
        }
    },
    created(){
        const chatId = this.$route.params.chatId;
        this.$store.dispatch({type: "getChatById", chatId})
    },
    computed: {
        chat(){
            return this.$store.getters.getChat
        }
    },
    methods:{
        sendMsg(){
            this.$store.dispatch({type: "getChatById", chatId})
        }
    }
}
</script>

<style>

</style>
