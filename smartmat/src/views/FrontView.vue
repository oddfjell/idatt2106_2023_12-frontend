<template xmlns="http://www.w3.org/1999/html">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <div v-if="username">
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
            if(!tokenStore().user.username){
                router.push("/")
            }
        }
}
</script>

<style scoped>
@import '@/assets/style/frontPage.css';
</style>
