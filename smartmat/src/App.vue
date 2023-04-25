<script setup>
import { RouterView } from 'vue-router'

import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar ></Navbar>
  <RouterView id="routerView" />
</template>

<style>
.container {
    max-width: 500px;
    margin: 30px auto;
    overflow: auto;
    padding: 30px;
    border-radius: 5px;
}
.Btn{
    margin: 20px auto;
    text-align: center;
}
.BlueBtn{
        background: #0b6dff;
        border: 0;
        padding: 10px 20px;
        color: white;
        border-radius: 5px;
}
.GreyBtn{
        background: #b7b7b7;
        border: 0;
        padding: 10px 20px;
        color: black;
        border-radius: 5px
}

.BlueBtn:hover {
    background-color: #4169a8;
    cursor: pointer;
}
.GreyBtn:hover {
    background-color: #d0cece;
    cursor: pointer;
}
#routerView{
    margin-top: 10%;
}
</style>
