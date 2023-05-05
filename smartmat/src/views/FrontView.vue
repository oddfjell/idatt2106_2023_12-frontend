<template xmlns="http://www.w3.org/1999/html">
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>

  <div id="frontViewContainer" v-if="username">
    <div id="outer-border">
      <RouterLink to="/refrigerator">
        <div class="card" id="card1">
          <h1>Kjøleskap</h1> <span class="material-symbols-outlined">kitchen</span>

        </div>
      </RouterLink>

      <RouterLink to="/weeklyMenu">
        <div class="card" id="card2">
          <h1>Ukemeny</h1> <span class="material-symbols-outlined">restaurant</span>
        </div>
      </RouterLink>

      <RouterLink to="/shoppingList">
        <div class="card" id="card3">
          <h1>Handleliste</h1>
          <span class="material-symbols-outlined">shopping_cart</span>
        </div>
      </RouterLink>
    </div>
    <div id="graphGrid">
      <GraphComponent id="lineChart"/>
      <PieChart id="pieChart"/>
    </div>
  </div>
  <div v-else class="container"><h1>Please log in</h1></div>
</template>
<script>
import {tokenStore} from "@/stores/tokenStore";
import router from "@/router";
import GraphComponent from "@/components/Graphs/LineGraphComponent.vue";
import PieChart from "@/components/Graphs/PieChart.vue";

export default {
  components: {GraphComponent, PieChart},
  computed: {
    /**
     * the username method is a computed property that returns the username of the currently logged in user
     * @returns {string} The username of the currently logged in user
     */
    username() {
      return tokenStore().user.username
    }
  },
  /**
   * The `created()` method is a lifecycle hook that is called after the component has been
   * initialized and its data has been set up.
   * This method checks if there is a user logged in, if not it redirects the user to the
   * login page. It also logs the user's username, restricted status and JSON web token to the console.
   */

  created() {
    if (!tokenStore().user.username) {
      router.push("/")
    }
    console.log(tokenStore().user.username);
    console.log(tokenStore().user.restricted);
    console.log(tokenStore().user.jwt)
  }
}
</script>

<style scoped>

@import "../assets/style/frontPage.css";
</style>
