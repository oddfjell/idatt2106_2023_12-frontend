<template>
  <div id="registerpage">
    <h1>Register Profile</h1>
    <form @submit.prevent >
      <label class="registerLabel">Brukernavn: </label>
      <input type="text" v-model="profile.username" placeholder="Skriv ditt brukernavn " name="username" required>
      <label class="registerLabel">Passord: </label>
      <input type="password" v-model="profile.password" placeholder="Skriv ditt passord " name="password" required>
      <div id="row">
        <label class="registerLabel">Restricted </label>
        <input type="checkbox" v-model="profile.restricted" name="restricted"/>
      </div>


      <p id="error" v-if="error">{{error}} </p>

      <div class="Btn">
        <button class="BlueBtn" id="registerBtn" @click="onSubmit" type="submit">Register</button>
      </div>

    </form>
  </div>

</template>

<script>
import accountService from "@/services/accountService";
import {tokenStore} from "@/stores/tokenStore";
import router from "@/router";

export default {
  name: "RegisterProfile",
  data() {
    return {
      profile: {
        username: "",
        restricted: false,
        password: ""
      },
      error:""
    }
  },

  methods: {

    async onSubmit() {
      if (this.profile.username !== "") {
        await accountService.registerProfile(this.profile, tokenStore().user.jwt);
        await router.push("/profile")
      }
    }
  }
}
</script>

<style scoped>


@import "../assets/style/register.css";
#registerBtn {
  width: 80%;
}

#registerpage{
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50vh;
  margin: 20vh auto auto;
  align-items: center;
}

#error{
  color:red
}

#row{
  display: flex;
  flex-direction: row;
}


</style>