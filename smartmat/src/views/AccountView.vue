<template>
  <div v-if="username" class="container">
    <p>Du er logget inn som: </p>
    <h1>{{username}}</h1>


    <button @click="logout" class="logout-Btn">Logg ut
      <span class="material-symbols-outlined">logout
  </span></button>
    <p v-if="error">{{error}}</p>
  </div>
  <div v-else class="container">
    <h1>Du er ikke logget inn</h1>
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
        this.error="Kunne ikke logge ut"
      }
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