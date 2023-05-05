<template>
  <div class="container">
    <h1>Logg inn</h1>
    <form @submit.prevent>
      <!-- Label and input for the username field -->
      <label class="loginLabel" for="username">Brukernavn: </label>
      <input type="text" v-model="user.username" placeholder="Skriv ditt brukernavn " name="username" required
             id="login-username">

      <!-- Label and input for the password field -->
      <label class="loginLabel" for="password">Passord: </label>
      <input type="password" v-model="user.password" placeholder="Skriv ditt passord" name="password" required
             id="login-password">

      <!-- Text field for displaying error messages -->
      <p id="error" v-if="error">{{ error }} </p>

      <!-- Button for logging in  -->
      <div class="Btn">
        <button class="BlueBtn" id="loginBtn" @click="onSubmit" type="submit">Logg inn</button>
      </div>
      <!-- Button redirecting to register-page -->
      <div class="Btn">
        <button class="GreyBtn" id="registerBtn" @click="onRegister">Har du ikke konto? <br/> Registrer deg her!
        </button>
      </div>
    </form>

  </div>
</template>
<script>
import accountService from "@/services/accountService";
import router from "@/router";
import {tokenStore} from "@/stores/tokenStore";

export default {
  /**
   * Login-credentials and error message
   * @returns {{error: string, user: {password: string, username: string}}}
   */
  data() {
    return {
      user: {
        password: "",
        username: ""
      },
      error: ""
    }
  },
  methods: {

    /**
     *Triggered when pressing the login button. Sends a loginrequest. If it is valid it sets the token and username as the
     * logged-in user
     * @returns {Promise<void>}
     */
    async onSubmit() {
      console.log(this.user.username)
      if (this.user.username !== undefined || "") {
        try {
          let response = await accountService.loginAccount(this.user)
          if (response.status === 200) {
            let data = response.data
            tokenStore().changeJWT(data.jwt)
            await router.push("/profile")
          } else {
            this.error = response.status
            console.log("Login failed")
          }
        } catch (error) {
          this.error = "Brukernavn/Passord er feil"
        }
      }
    },
    /**
     * Sends user to the register page
     */
    onRegister() {
      router.push('/register')
    }
  },
  /**
   Lifecycle hook called when the component is created. If the user is already logged in (tokenStore().user.username !== ""),
   they are redirected to the profile page, otherwise, nothing happens.
   */
  created() {
    if (tokenStore().user.username !== "") {
      console.log(tokenStore().user.username)
      router.push("/profile")
    }
  }
}
</script>

<style scoped>

@import "../assets/style/login.css";


</style>
