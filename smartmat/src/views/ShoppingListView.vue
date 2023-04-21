<template>
  <div class="container">
  <h1>Handleliste</h1>
  </div>
</template>

<script>

import shoppingListService from "@/services/shoppingListService";

export default {
  name: "ShoppingList",
    groceries:[],


    async created() {
       let groceries = await shoppingListService.getProducts()
        for(let grocery of groceries){
            this.groceries.push(grocery)
        }
        console.log(this.groceries)
    }
}


</script>

<style scoped>

</style>