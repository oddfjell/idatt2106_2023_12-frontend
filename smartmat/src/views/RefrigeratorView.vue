<template>
<div id="fridgeContainer" class="container">
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
    min-height: 90vh;
}
#fridgeContainer{
    margin-left: 10%;
    margin-right: 10%;

}
</style>