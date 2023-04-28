<template>
<div>
    <div v-if="uncheckedEntities || checkedEntities" id="shoppingListEntitiesGrid">
        <div id="unchecked_list">
            <h3>Ikke funnet</h3>
            <div v-for="(uncheckedEntity, index) in uncheckedEntities" :key="uncheckedEntity.name">
                <ShoppingListEntity :tabindex="index+1" :listEntity="uncheckedEntity" @updateChecked="updateChecked" :count="uncheckedEntity.count" />
            </div>
        </div>
        <div id="checked_list">
            <h3>Funnet</h3>
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
    },
    mounted(){
        this.updateChecked();
    },
}
</script>

<style scoped>
#shoppingListEntitiesGrid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap:5px;
}

#unchecked_list{
    text-align: center;
    border: 1px solid steelblue;
    padding: 10px;
    border-radius: 5px;
    min-height: 60vh;
    max-height: 90vh;
    overflow: auto;
}
#checked_list{
    text-align: center;
    border: 1px solid steelblue;
    padding: 10px;
    border-radius: 5px;
    min-height: 60vh;
    max-height: 90vh;
    overflow: auto;
}
</style>