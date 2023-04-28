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
//import NumberInput from "@/components/Common/NumberInput.vue";

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
      // eslint-disable-next-line vue/no-mutating-props
     this.listEntity.count--;
    }
  },
  increment(){
    // eslint-disable-next-line vue/no-mutating-props
    this.listEntity.count++;
  },
  resetCounter(){
    // eslint-disable-next-line vue/no-mutating-props
          this.listEntity.count=0;
  }
  },
    created() {
        console.log(this.listEntity)
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