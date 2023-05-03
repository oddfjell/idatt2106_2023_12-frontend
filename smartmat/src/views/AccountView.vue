<template>
  <div v-if="username" class="container">
    <p>You are logged in as: </p>
    <h1>{{username}}</h1>


    <div id="buttons">
      <button @click="changeProfile" class="logout-Btn">Bytt bruker</button>
      <button @click="logout" class="logout-Btn">Logg ut
        <span class="material-symbols-outlined">logout</span></button>
    </div>


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
  name: "ProfileView",
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
    },
    changeProfile(){
      tokenStore().changeUsername("")
      router.push("/profile")
    }
  },
  created() {
    console.log(tokenStore().user.username)
  }
}

</script>

<style scoped>
@import '@/assets/style/account.css';
</style>