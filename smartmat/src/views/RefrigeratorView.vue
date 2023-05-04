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
    username() {
      return tokenStore().user.username
    }
  },
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