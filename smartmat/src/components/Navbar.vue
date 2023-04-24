<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <nav>
    <RouterLink to="/ShoppingListView" tag ="button">
    <fa :icon="['fas', 'cart-shopping']" class="fa-icon-cart"/>
      </RouterLink>

    <RouterLink to="/" tag ="button">
    <fa :icon="['fas', 'home']" class="fa-icon-home" />
    </RouterLink>


    <fa :icon="['fas', 'user']" class="fa-icon-user" />


    <RouterLink to="/WeeklyMenuView" tag ="button" >
    <fa :icon="['fas', 'cutlery']" class="fa-icon-cutlery" />
    </RouterLink>

    <RouterLink to="/RefrigeratorView" tag ="button">
      <img class="fridge" src="../images/fridge.svg" alt="Kjøleskap">
    </RouterLink>

    </nav>

  </header>

  <RouterView />
</template>

<style scoped>
@import "../assets/style/navbar.css";


</style>
