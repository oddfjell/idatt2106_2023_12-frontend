<template>
<div class="container">
    <h1>Kjøleskap</h1>
    <GroceryGrid/>
</div>
</template>

<script>
import GroceryGrid from "@/components/Fridge/GroceryGrid.vue";
export default {
  name: "RefrigeratorView",
    components: {GroceryGrid}
}
</script>

<style scoped>
.container{
    max-width: none;
}
</style>