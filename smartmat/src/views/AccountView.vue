<template>
<div v-if="username" class="container">
    <p>You are logged in as: </p>
    <h1>{{username}}</h1>

    <button @click="logout" class="GreyBtn Btn">Log out</button>
    <p v-if="error">{{error}}</p>
</div>
  <div v-else class="container">
      <h1>You are not logged in</h1>
  </div>
</template>

<script>
import {tokenStore} from "@/stores/tokenStore";
import router from "@/router";

export default {
    name: "AccountView",
    data(){
        return{
            error:null
        }
    },
    computed:{
        username(){
            return tokenStore().user.username
        }
    },
    methods:{
        logout(){
            try {
                tokenStore().changeJWT("")
                tokenStore().changeUsername("")
                router.push("/")
            }catch (error){
                this.error="Could not log out"
            }
        }
    },
    created() {
        console.log(tokenStore().user.username)
    }
}

</script>

<style scoped>
.container{
    text-align: center;
}
</style>