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

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  position: relative;
  background-color: #fff;
  width: 400px;
  max-width: 90%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}


.popup-title {
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #333;
}


.popup-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}


.popup-button {
  background-color: #e50914;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  margin: 0 auto;
  width: 50%;
}


.popup-button:hover {
  background-color: #d10812;
}


#popup-close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: color 0.3s;
}


#popup-close:hover {
  color: #e50914;
}

 .material-symbols-outlined {
   float: right;
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