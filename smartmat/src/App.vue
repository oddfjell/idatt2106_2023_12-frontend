<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>

      <HelloWorld msg="Hello!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">| Login</RouterLink>
        <RouterLink to="/register"> | Register</RouterLink>

      </nav>

  </header>

  <RouterView />
</template>

<style scoped>



</style>
