<template>
  <div class="container">
  <h1>Handleliste</h1>

      <button>AddT</button>
  </div>
</template>

<script>

import shoppingListService from "@/services/shoppingListService";
import {tokenStore} from "@/stores/tokenStore";
import groceryService from "@/services/groceryService";

export default {
  name: "ShoppingList",
    data(){
      return{
          groceries:[],
      }
    },

    async created() {
      console.log(tokenStore().user.jwt)
       let groceriesResponse = await groceryService.getProducts(tokenStore().user.jwt)
        let groceries = groceriesResponse.data
        for(let grocery of groceries){
            this.groceries.push(grocery)
        }
    }
}


</script>

<style scoped>

</style>