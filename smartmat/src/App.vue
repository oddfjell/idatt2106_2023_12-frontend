<script setup>
import {RouterView} from 'vue-router'

import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar id="top-navbar"></Navbar>
  <div id="whitespace"></div>
  <RouterView/>
  <Navbar id="bottom-navbar"></Navbar>
</template>

<style>
@import "./assets/style/app.css";
</style>
