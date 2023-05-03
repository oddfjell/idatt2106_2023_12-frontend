<template>
  <div v-if="username" class="container">
    <p>Du er logget inn som: </p>
    <span id="user" class="material-symbols-outlined">
  account_circle
  </span>
    <h1 id="loggedin-user">{{ username }}</h1>


    <div id="buttons">
      <button @click="changeProfile" class="logout-Btn">Bytt bruker</button>
      <button @click="logout" class="logout-Btn">Logg ut
        <span class="material-symbols-outlined">logout</span></button>
    </div>


    <p v-if="error">{{ error }}</p>
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
  data() {
    return {
      error: null
    }
  },
  computed: {
    username() {
      return tokenStore().user.username
    }
  },
  methods: {
    logout() {
      try {
        tokenStore().changeJWT("")
        tokenStore().changeUsername("")
        router.push("/")
      } catch (error) {
        this.error = "Kunne ikke logge ut"
      }
    },
    changeProfile() {
      tokenStore().changeUsername("")
      router.push("/profile")
    }
  },
  created() {
    console.log(tokenStore().user.username)
  }
}

</script>

<style scoped>

@import "../assets/style/account.css";
</style>