<template>
  <div v-if="username" id="fridgeContainer" class="container">
    <h1>Kjøleskap</h1>
    <GroceryGrid/>
  </div>
  <div v-else class="container"><h1>Please log in</h1></div>
</template>

<script>
import GroceryGrid from "@/components/Fridge/GroceryGrid.vue";
import {tokenStore} from "@/stores/tokenStore";
import router from "@/router";

export default {
  name: "RefrigeratorView",
  components: {GroceryGrid},
  computed: {
    /**
     Returns the username value from the tokenStore.
     @returns {string} The username value.
     */
    username() {
      return tokenStore().user.username
    }
  },
  /**
   * Lifecycle hook method called when the component is created.
   * Checks if the user is logged in by verifying if a `username` is stored in the `tokenStore` Vuex store.
   * If the user is not logged in, redirects the user to the root URL (`/`).
   */
  created() {
    if (!tokenStore().user.username) {
      router.push("/")
    }
  }
}
</script>

<style scoped>
@import "../assets/style/refrigerator.css";
</style>