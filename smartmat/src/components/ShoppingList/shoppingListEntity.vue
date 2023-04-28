<template>
    <div id="container">
    <input type="checkbox" :checked="listEntity.foundInStore" @change="updateChecked">
        <p>{{ listEntity.name}}</p>
        <div class="counter">
            <span>{{listEntity.count}}</span>
            <button class="decrement" :disabled="listEntity.count<=1" @click.prevent="decrement">-</button>
            <button class="increment" :disabled="listEntity.count>=99" @click.prevent="increment">+</button>
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
#container{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.decrement{
 margin-left: 5px;
}
.increment{
    margin-right: 5px;
}
.counter{
  display: inline-block;
  justify-content: center;
    align-items: flex-end;
}
</style>