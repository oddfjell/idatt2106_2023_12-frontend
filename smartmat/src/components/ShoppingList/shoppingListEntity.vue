<template>
    <div id="container">
    <input type="checkbox" :checked="listEntity.foundInStore" @change="updateValue">
        <p>{{ listEntity.name }}</p>



       <!--<VueNumberInput :model-value="listEntity.count" @update:model-value="updateValue" /> //TODO -->
      <div class="counter">
      <button class="decrement" @click.prevent="decrement">-</button>
      <span>{{listEntity.count}}</span>
      <button class="increment" @click.prevent="increment">+</button>
        <span class="material-symbols-outlined" @click.prevent="resetCounter">
delete</span>
      </div>
    </div>
</template>

<script>

import shoppingListService from "@/services/shoppingListService";
import {tokenStore} from "@/stores/tokenStore";

export default {
    name: "shoppingListEntity",
    components: {},
    props:{
        listEntity:Object
    },
    methods:{
        updateValue(){
            try{
                shoppingListService.updateChecked(this.listEntity.name, tokenStore().user.jwt)

            }catch (error){
                console.log(error)
            }
        },
        remove(){
            try{
                shoppingListService.removeFromShoppingList(this.listEntity.name, tokenStore().user.jwt)
            }catch (error){
                console.log(error)
            }
        },
        decrement(){
            if(this.listEntity.count>1){
                this.listEntity.count--;
            }
        },
        increment(){
                this.listEntity.count++;
        },
        resetCounter(){
                this.listEntity.count=0;
        }
    },
    created() {
    },
}
</script>

<style scoped>
#container{
    display: flex;
    justify-content: space-between;
}
.decrement,
.increment{
  margin: 10px;
}
.counter{
  display: inline-block;
  justify-content: center;
}
</style>