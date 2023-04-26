<template>
  <header>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <div id="navbar-frame">
    <nav v-if="username">
        <RouterLink to="/home">
            <span class="material-symbols-outlined">home</span>
        </RouterLink>
        <RouterLink to="/refrigerator">
          <span class="material-symbols-outlined">kitchen</span>
        </RouterLink>
        <RouterLink to="/weeklyMenu">
          <span class="material-symbols-outlined">restaurant</span>
        </RouterLink>
    <RouterLink to="/shoppingList">
      <span class="material-symbols-outlined">shopping_cart</span>
      </RouterLink>

        <RouterLink to="/profile" >
<span class="material-symbols-outlined">person</span>
        </RouterLink>
    </nav>
    </div>

  </header>
</template>
<script>
import { RouterLink} from 'vue-router'
import {tokenStore} from "@/stores/tokenStore";
export default{
    computed:{
        username(){
            return tokenStore().user.username
        }
    }
}
</script>


<style scoped>
@import "../assets/style/navbar.css";

header{
    width: 100%;
}


</style>
