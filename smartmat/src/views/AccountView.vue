<template>
  <div v-if="username" class="container">
    <p>Du er logget inn som: </p>
    <span id="user" class="material-symbols-outlined">
  account_circle
  </span>
    <h1 id="loggedin-user">{{ username }}</h1>
    <div id="buttons">
      <button @click="changeProfile" id="changeProfile" class="logout-Btn">Bytt bruker</button>
      <button @click="logout" id="logout" class="logout-Btn">Logg ut
        <span class="material-symbols-outlined">logout</span></button>

      <button v-if="!restricted" @click="removeAccount" id="removeAccount" class="logout-Btn">Slett konto</button>
    </div>


    <p v-if="error">{{ error }}</p>
  </div>
  <div v-else class="container">
    <h1>Du er ikke logget inn</h1>
  </div>
</template>
/**

The ProfileView page carries the user's profile information and allows them to log out, switch profiles, or delete their account.
username: The current user's username.
restricted: A boolean indicating whether the user's account is restricted.
@event {function} logout - A method that logs the user out and redirects them to the home page.
@event {function} changeProfile - A method that allows the user to switch profiles.
@event {function} removeAccount - A method that deletes the user's account.
@throws {Error} If the logout method fails to log the user out.
@memberof components
*/
<script>
import {tokenStore} from "@/stores/tokenStore";
import router from "@/router";
import accountService from "@/services/accountService";

export default {
  name: "ProfileView",
  data() {
    return {
      error: null
    }
  },
  computed: {
    username() {
      return tokenStore().user.username
    },
    restricted() {
      return tokenStore().user.restricted
    }
  },
  methods: {
    /**
     * The logout() method logs the user out by clearing their JWT and username from the
     * tokenStore and redirects them to the home page using the Vue.js router.
     * @throws {error} If there was an error logging the user out.
     * @return {void}
     *
     */

    logout() {
      try {
        tokenStore().changeJWT("")
        tokenStore().changeUsername("")
        router.push("/")
      } catch (error) {
        this.error = "Kunne ikke logge ut"
      }
    },
    /**
     * The changeProfile() method changes the user's profile by clearing their username from the tokenStore and redirecting
     * them to the profile page using the Vue.js router.
     * @return {void}
     */
    changeProfile() {
      tokenStore().changeUsername("")
      router.push("/profile")
    },
    /**
     * The removeAccount() method deletes the user's account after confirming with the user that they wish to proceed.
     * This method uses the accountService.removeAccount method to delete the user's account from the server and
     * clears the user's JWT and username from the tokenStore. After the account is deleted, it redirects the user to
     * the home page using the Vue.js router and displays a confirmation alert.
     * @throws {error} If there was an error removing the user's account.
     * @return {void}
     */
    removeAccount() {
      if (confirm("Er du sikker på at du vil slette kontoen? All data vil bli tapt!")) {
        try {
          accountService.removeAccount(tokenStore().user.jwt)
          tokenStore().changeJWT("")
          tokenStore().changeUsername("")
          router.push("/")
          alert("Din konto ble slettet")
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  /**
   The created() method logs the current user's username to the console upon component creation.
   @return {void}
   */
  created() {
    console.log(tokenStore().user.username)
  }
}

</script>

<style scoped>

@import "../assets/style/account.css";
</style>