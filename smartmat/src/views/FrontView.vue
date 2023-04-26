<template xmlns="http://www.w3.org/1999/html">
    <div v-if="username">
  <div id="outer-border">
    <RouterLink to="/refrigerator">
        <div id="border">
        <h1>Kjøleskap</h1> <img class="fridge-frontPage" src="../images/fridge.svg" alt="Kjøleskap">
        </div>
    </RouterLink>

    <RouterLink to="/weeklyMenu">
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
    </div>
  <div v-else class="container"><h1>Please log in</h1></div>
</template>
<script>
import {tokenStore} from "@/stores/tokenStore";
import router from "@/router";

export default {
    computed:{
        username(){
            return tokenStore().user.username
        }
    },
    created() {
            if(tokenStore().user.username == null ){
                router.push("/")
            }
        }
}
</script>

<style scoped>
@import '@/assets/style/frontPage.css';
</style>
