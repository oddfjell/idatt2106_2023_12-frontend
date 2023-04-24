<template>
  <div class="container">
  <h1>Handleliste</h1>
      <div id="header">
      <Dropdown id="dropdown"
              :options="groceries"
                :placeholder="selectedText"
              v-on:selected="onSelection">
      </Dropdown>
      <NumberInput v-model:model-value="amount" id="numberInput" :min="1" :max="99" :controls=true />
      <button @click="addShoppingListEntity">Legg til vare</button>
      </div>
  </div>
</template>

<script>

import {tokenStore} from "@/stores/tokenStore";
import groceryService from "@/services/groceryService";
import Dropdown from '@/components/Common/Dropdown.vue';
import NumberInput from "@/components/Common/NumberInput.vue";
import shoppingListService from "@/services/shoppingListService";


export default {
  name: "ShoppingList",
    components:{Dropdown, NumberInput},
    data(){
      return{
          selectedText:"Søk etter vare",
          amount:1,
          selected:null,
          groceries:[],
          shoppingListEntities:[],
      }
    },
    methods:{
        onSelection(selection) {
            this.selected = selection;
            this.selectedText=selection.name
            console.log(selection.name + " has been selected");
        },
        async addShoppingListEntity(){
            let product = {grocery:this.selected, count: this.amount}
            console.log(product)
            try {
                await shoppingListService.addToShoppingList(product, tokenStore().user.jwt)
            }catch (error){
              console.log(error)
            }finally {
                this.selected=null
                this.amount = 1
            }
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
.container{
    min-height: 80vh;
}
#header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0;
}

#dropdown{
    width: 100%;
}
</style>