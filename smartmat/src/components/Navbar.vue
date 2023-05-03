<template>
  <header>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <div id="logo-frame">
    <img id="logo" src="../images/logo.png">
    </div>
    <div id="placeholder-space">
    </div>
    <div  id="navbar-frame" >
    <nav>
      <div id="nav-icons" v-if="username" >

        <div id="all-icons-bottom" v-if="$route.path=='/home'" >
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
        </div>

        <div id="except-user-top" v-if="$route.path !=='/home'">
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
        </div>
        <RouterLink to="/account" >
          <span class="material-symbols-outlined">person</span>
        </RouterLink>
      </div>

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
