<template>
<div>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap" rel="stylesheet">
    <button class="buttons" id="show-list" @click="toggleCheckedList"> {{toggleBtnText}}</button>
    <div v-if="uncheckedEntities || checkedEntities" id="shoppingListEntitiesGrid">
        <div id="unchecked_list">
            <h3 class="font">Ikke valgt</h3>
          <ul>
            <li v-for="(uncheckedEntity, index) in uncheckedEntities" :key="uncheckedEntity.name">
              <ShoppingListEntity :tabindex="index+1" :listEntity="uncheckedEntity" @updateChecked="updateChecked" :count="uncheckedEntity.count" />
            </li>
          </ul>
        </div>
        <div id="checked_list">
            <h3 class="font">Valgt</h3>
          <ul>
            <li v-for="(checkedEntity, index) in checkedEntities" :key="checkedEntity.name">
              <ShoppingListEntity :tabindex="index+1" :listEntity="checkedEntity" @updateChecked="updateChecked" :count="checkedEntity.count" />
            </li>
          </ul>

        </div>
    </div>
    <div v-else><h3>Ingen varer i handlelisten!</h3></div>
</div>
</template>

<script>
import ShoppingListEntity from "@/components/ShoppingList/shoppingListEntity.vue";
import {shoppingListStore} from "@/stores/shoppingListStore";

export default {
    name: "shoppingListGrid",
    components: {ShoppingListEntity},
    data(){
        return{
            uncheckedEntities:Array,
            checkedEntities:Array,
            toggleBtnText:"Vis valgte"
        }
    },
    methods:{
        shoppingListStore,
        updateChecked(){
            let uncheckedEntities = []
            for (const entity of shoppingListStore().getShoppingListEntities()) {
                if(!entity.foundInStore && entity.count!==0){
                    uncheckedEntities.push(entity)
                }
            }
            let checkedEntities = []
            for (const entity of shoppingListStore().getShoppingListEntities()) {
                if(entity.foundInStore && entity.count!==0){
                    checkedEntities.push(entity)
                }
            }
            this.uncheckedEntities=uncheckedEntities
            this.checkedEntities=checkedEntities
        },
        toggleCheckedList(){
            let checkedList = document.querySelector("#checked_list")
            let uncheckedList = document.querySelector("#unchecked_list")
            if(checkedList.style.display === "block"){
               checkedList.style.display = "none"
                uncheckedList.style.display= "block"
                this.toggleBtnText="Vis valgte"
            } else{
                checkedList.style.display = "block"
                uncheckedList.style.display= "none"
                this.toggleBtnText="Vis ikke valgte"
            }
        }
    },
    mounted(){
        this.updateChecked();
    },
}
</script>

<style scoped>
@import "../../assets/style/shoppingList.css";

</style>