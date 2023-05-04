<template>
  <div id="registerpage">
    <h1 class="registerLabel">Registrer Profil</h1>
    <form @submit.prevent>
      <label class="registerLabel">Navn: </label>
      <input type="text" v-model="profile.username" placeholder="Skriv ditt navn " name="username" required>
      <label class="registerLabel">PIN: </label>
      <input type="password" v-model="profile.password" placeholder="Skriv din pin-kode " name="password" required>
      <div id="row">
        <input id="checkbox" type="checkbox" v-model="profile.restricted" name="restricted"/>
        <label class="registerLabel" id="restricted">Begrenset</label>
      </div>


      <p id="error" v-if="error">{{ error }} </p>

      <div class="Btn">
        <button class="BlueBtn" @click="onSubmit" type="submit">Registrer</button>
        <router-link to='/profile'>
        <button class="BlueBtn" >Tilbake</button>
        </router-link>
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
      error: ""
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

</style>