<script setup>
import { RouterView } from 'vue-router'

import Navbar from "@/components/Navbar.vue";
</script>

<template>

  <Navbar></Navbar>

  <RouterView />
</template>

<style>
.container {
    max-width: 500px;
    margin: 30px auto;
    overflow: auto;
    border: 1px solid steelblue;
    padding: 30px;
    border-radius: 5px;
}
.Btn{
    margin: 20px auto;
    text-align: center;
}
</style>
