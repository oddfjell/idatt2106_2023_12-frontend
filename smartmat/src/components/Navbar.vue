<script setup>
import { RouterLink} from 'vue-router'

</script>

<template>
  <header>
    <div id="navbar-frame">
    <nav>
    <RouterLink to="/shoppingList" tag ="button">
    <fa :icon="['fas', 'cart-shopping']" class="fa-icon-cart"/>
      </RouterLink>

    <RouterLink to="/home" tag ="button">
    <fa :icon="['fas', 'home']" class="fa-icon-home" />
    </RouterLink>


    <fa :icon="['fas', 'user']" class="fa-icon-user" />


    <RouterLink to="/weeklyMenu" tag ="button" >
    <fa :icon="['fas', 'cutlery']" class="fa-icon-cutlery" />
    </RouterLink>

    <RouterLink to="/refrigerator" tag ="button">
      <img class="fridge" src="../images/fridge.svg" alt="Kjøleskap">
    </RouterLink>

    </nav>
    </div>

  </header>
</template>

<style scoped>
@import "../assets/style/navbar.css";

header{
    width: 100%;
}


</style>
