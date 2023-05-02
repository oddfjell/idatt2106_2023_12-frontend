<template>

  <div class="popup">
    <div class="popup-inner">
      <form @submit.prevent="login">
        <h1>PIN</h1>
        <input type="text" v-model="password">
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


</style>