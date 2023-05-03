<template>
<div>
    <button class="hamburgerBtn Btn GreyBtn" @click="toggleCheckedList"> {{toggleBtnText}}</button>
    <div v-if="uncheckedEntities || checkedEntities" id="shoppingListEntitiesGrid">
        <div id="unchecked_list">
            <h3>Ikke valgt</h3>
            <div v-for="(uncheckedEntity, index) in uncheckedEntities" :key="uncheckedEntity.name">
                <ShoppingListEntity :tabindex="index+1" :listEntity="uncheckedEntity" @updateChecked="updateChecked" :count="uncheckedEntity.count" />
            </div>
        </div>
        <div id="checked_list">
            <h3>Valgt</h3>
            <div v-for="(checkedEntity, index) in checkedEntities" :key="checkedEntity.name">
                <ShoppingListEntity :tabindex="index+1" :listEntity="checkedEntity" @updateChecked="updateChecked" :count="checkedEntity.count" />
            </div>
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
@import "../../assets/style/shoppingListGrid.css";
</style>