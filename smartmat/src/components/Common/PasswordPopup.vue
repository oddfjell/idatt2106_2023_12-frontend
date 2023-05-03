<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="popup-overlay">
    <div class="popup-container">
      <form @submit.prevent="login">
        <span class="material-symbols-outlined" @click="close" id="popup-close">close</span>
        <h1 class="popup-title">PIN</h1>
        <input type="password" v-model="password" class="popup-input">
        <p>{{error}}</p>
        <button type="submit" class="popup-button">Logg inn</button>
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

@import "../../assets/style/passwordPopup.css";

</style>