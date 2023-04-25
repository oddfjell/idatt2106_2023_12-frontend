<template xmlns="http://www.w3.org/1999/html">
  <div id="outer-border">
    <RouterLink to="/refrigerator">
        <div id="border">
        <h1>Kjøleskap</h1> <img class="fridge-frontPage" src="../images/fridge.svg" alt="Kjøleskap">
        </div>
    </RouterLink>
    <RouterLink to="/weeklyMenuView">
      <div id="border">
        <h1>Ukemeny</h1> <fa :icon="['fas', 'cutlery']" class="fa-icon-cutlery-frontPage"/>
      </div>
    </RouterLink>
    <RouterLink to="/shoppingList">
      <div id="border">
        <h1>Handleliste</h1>
        <fa :icon="['fas', 'cart-shopping']" class="fa-icon-cart-frontPage"/>
      </div>
    </RouterLink>
  </div>
</template>
<script>
import {tokenStore} from "@/stores/tokenStore";

export default {
    created() {
        console.log(tokenStore().user.username)
        console.log(tokenStore().user.jwt)
    }
}
</script>

<style scoped>
@import '@/assets/style/frontPage.css';
</style>
