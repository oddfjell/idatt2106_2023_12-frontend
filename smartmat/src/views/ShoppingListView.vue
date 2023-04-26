<template>
  <div v-if="username" class="container">
  <h1>Handleliste</h1>
      <div id="header">
      <Dropdown id="dropdown"
              :options="groceries"
                :placeholder="selectedText"
              v-on:selected="onSelection">
      </Dropdown>
          <button @click="addShoppingListEntity">Legg til vare</button>
      </div>
      <div class="container">
     <ShoppingListGrid/>
      </div>
      <div class="Btn">
      <button class="BlueBtn" id="addSelected" @click="buy">Kjøp valgte varer</button>
      </div>
  </div>
  <div v-else>
      <h1>Please log in</h1>
  </div>
</template>

<script>

import {tokenStore} from "@/stores/tokenStore";
import groceryService from "@/services/groceryService";
import Dropdown from '@/components/Common/Dropdown.vue';
import shoppingListService from "@/services/shoppingListService";
import ShoppingListGrid from "@/components/ShoppingList/shoppingListGrid.vue";


export default {
  name: "ShoppingList",
    components:{ShoppingListGrid, Dropdown},
    data(){
      return{
          selectedText:"Søk etter vare",
          amount:1,
          selected:null,
          groceries:[],
          shoppingListEntities:[]
      }
    },
    methods:{
        onSelection(selection) {
            this.selected = selection;
            this.selectedText=selection.name
            console.log(selection.name + " has been selected");
        },
        buy(){
            try {
                console.log(tokenStore().user.jwt)
                shoppingListService.buyChecked(tokenStore().user.jwt)
                location.reload()
            }catch (error){
                console.log(error)
            }
        },
        async addShoppingListEntity(){
            let product = {name:this.selected.name, count: this.amount}
            console.log(product)
            try {
                await shoppingListService.addToShoppingList(product, tokenStore().user.jwt)
                location.reload()
            }catch (error){
              console.log(error)
            }finally {
                this.selected=null
                this.amount = 1
            }
        },
    },
    async created() {
       let groceriesResponse = await groceryService.getProducts(tokenStore().user.jwt)
        let groceries = groceriesResponse.data
        for(let grocery of groceries){
            this.groceries.push(grocery)
        }
    },
    computed:{
        username(){
            return tokenStore().user.username
        }
    },
}


</script>

<style scoped>
.container{
    min-height: 50vh;
    border: 1px solid steelblue;
}
#header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5%;
}

#dropdown{
    width:80%;
}
</style>