<template>
  <div id="container">
    <div id="item">
    <input type="checkbox" :checked="listEntity.foundInStore" @change="updateChecked">
    <p id="grocery-item">{{ listEntity.name }}</p>
    </div>
    <div class="counter">
      <button class="buttons" id="decrement" :disabled="listEntity.count<=1" @click.prevent="decrement">-</button>
      <span id="number">{{ listEntity.count }}</span>
      <button class="buttons" id="increment" :disabled="listEntity.count>=99" @click.prevent="increment">+</button>
      <span class="material-symbols-outlined" @click.prevent="resetCounter">delete</span>
    </div>
  </div>
</template>

<script>

import {shoppingListStore} from "@/stores/shoppingListStore";

export default {
    name: "shoppingListEntity",
    components: {},
    props:{
        listEntity:Object,

    },
    methods:{
        updateChecked(event){
              let listEntityCopy = this.listEntity
                listEntityCopy.foundInStore = event.target.checked
              shoppingListStore().updateShoppingListEntity(listEntityCopy)
            shoppingListStore().setStateSaved(false)
            this.$emit("updateChecked")
        },
        decrement(){
            if(this.listEntity.count>1){
                let listEntityCopy = this.listEntity
                listEntityCopy.count--
                shoppingListStore().updateShoppingListEntity(listEntityCopy)
                shoppingListStore().setStateSaved(false)
            }
        },
        increment(){
            if(this.listEntity.count<100) {
                let listEntityCopy = this.listEntity
                listEntityCopy.count++
                shoppingListStore().updateShoppingListEntity(listEntityCopy)
                shoppingListStore().setStateSaved(false)
            }
        },
        resetCounter(){
            let listEntityCopy = this.listEntity
            listEntityCopy.count = 0
            shoppingListStore().updateShoppingListEntity(listEntityCopy)
            shoppingListStore().setStateSaved(false)
            this.$emit("updateChecked")
        }
    },
}
</script>

<style scoped>
@import "../../assets/style/shoppingList.css";

</style>