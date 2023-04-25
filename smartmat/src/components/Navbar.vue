<script setup>
import { RouterLink} from 'vue-router'

</script>

<template>
  <header>
    <div id="navbar-frame">
    <nav>
        <RouterLink to="/home">
            <fa :icon="['fas', 'home']" class="fa-icon-home" />
        </RouterLink>
        <RouterLink to="/refrigerator">
            <img class="fridge" src="../images/fridge.svg" alt="Kjøleskap">
        </RouterLink>
        <RouterLink to="/weeklyMenu">
            <fa :icon="['fas', 'cutlery']" class="fa-icon-cutlery" />
        </RouterLink>
    <RouterLink to="/shoppingList">
    <fa :icon="['fas', 'cart-shopping']" class="fa-icon-cart"/>
      </RouterLink>

        <RouterLink to="/profile" >
            <fa :icon="['fas', 'user']" class="fa-icon-user" />
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
