<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="popup-overlay">
    <div class="popup-container">
      <form @submit.prevent="login">
        <span class="material-symbols-outlined" @click="close" id="popup-close">close</span>
        <h1 class="popup-title">PIN</h1>
        <input type="password" v-model="password" class="popup-input">
        <p>{{error}}</p>
        <button v-if="!deleteProfile" type="submit" class="popup-button" id="login">Logg inn</button>
        <button v-else-if="deleteProfile" type="submit" class="popup-button" id="delete">SLETT PROFIL</button>
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
    profile:Object,
    deleteProfile:false
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
      if(this.deleteProfile){
        try {
          await accountService.deleteProfile(loginProfile, tokenStore().user.jwt)
          location.reload();
        }catch (error){
          this.error = "Feil password";
        }

      }else{
        try{
          await accountService.loginProfile(loginProfile, tokenStore().user.jwt)

          tokenStore().changeUsername(this.profile.username);
          tokenStore().changeRestriction(this.profile.restricted);
          await router.push("/home")
        }catch (error){
          this.error = "Feil password";
        }
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
  width: 25em;
  max-width: 90%;
  padding: 2.5em;
  border-radius: 2em;
  box-shadow: 0 0 4em rgba(0, 0, 0, 0.5);
}


.popup-title {
  margin-top: 0;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  color: #333;
}


.popup-input {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 2em;
  font-size: 1em;
  border: none;
  border-radius: 0.5em;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.2);
}


.popup-button {
  color: #fff;
  padding: 1em 2em;
  border: none;
  border-radius: 3em;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  margin: 0 auto;
  width: 50%;
}

#login{
  background: #6dbd5e;
}

#delete{
  background: red;
}

#login:hover{
  background: black;
}

#delete:hover{
  background: black;
}


#popup-close {
  position: absolute;
  top: 1em;
  right: 1em;
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: color 0.3s;
}


#popup-close:hover {
  color: #de1726;
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