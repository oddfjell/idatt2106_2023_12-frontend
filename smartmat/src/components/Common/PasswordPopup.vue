<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="popup">
    <div class="popup-inner">
      <form @submit.prevent="login">
        <span class="material-symbols-outlined" @click="close">close</span>
        <h1>PIN</h1>
        <input type="password" v-model="password">
        <p>{{error}}</p>
        <button type="submit">Logg inn</button>
      </form>
    </div>
  </div>

</template>

<script>
import accountService from "@/services/accountService";
import {tokenStore} from "@/stores/tokenStore";
import router from "@/router";

export default {
  name: "PasswordPopup",
  props:{
    profile:Object
  },
  data() {
    return {
      password: "",
      error: ""
    }
  },
  emits:{
    close:{

    }
  },
  methods:{

    async login() {
      let loginProfile = {
        username: this.profile.username,
        restricted: this.profile.restricted,
        password: this.password
      }
      try{
        await accountService.loginProfile(loginProfile, tokenStore().user.jwt)

        tokenStore().changeUsername(this.profile.username);
        tokenStore().changeRestriction(this.profile.restricted);
        await router.push("/home")
      }catch (error){
        this.error = "Feil password";
      }

    },

    close(){
      this.$emit("closePopup");
    }

  }
}
</script>

<style scoped>

.popup{
  position: fixed;
  z-index: 99999;
  width: 100%;
  text-align: center;
  top: 0;
  background-color: rgba(0,0,0,0.2);
  height: 100vh;
  transition-duration: 2s;
  display: flex;
  justify-content: center;
}

.popup-inner{
  margin-top: 35vh;
  background-color: white;
  width: 25vh;
  height: 20vh;
  transition-duration: 2s;
}

 .material-symbols-outlined {
   font-variation-settings:
       'FILL' 0,
       'wght' 400,
       'GRAD' 0,
       'opsz' 48
 }

.material-symbols-outlined:hover {
  cursor: pointer;
}


</style>