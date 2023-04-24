<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>

    <fa icon="user" class="fa-icon-user" />
    <fa icon="cart-shopping" class="fa-icon-cart"/>

    <nav>
      <RouterLink to="/">Hjem</RouterLink>
      <RouterLink to="/weeklyMenuView"> | Ukemeny</RouterLink>
      <RouterLink to="/shoppingListView"> | Handleliste</RouterLink>
      <RouterLink to="/refrigeratorView"> | Kjøleskap</RouterLink>



    </nav>

  </header>

  <RouterView />
</template>

<style scoped>
@import "../assets/style/navbar.css";


</style>
