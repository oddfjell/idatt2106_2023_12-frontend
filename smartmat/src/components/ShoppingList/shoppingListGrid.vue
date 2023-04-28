<template>
<div>
    <div v-if="loading">Laster ...</div>
    <div v-else-if="shoppingListStore().getShoppingListEntities()" id="shoppingListEntitiesGrid">
    <div id="unchecked_list">
        <div v-for="(uncheckedEntity, index) in uncheckedEntities" :key="index">
            <ShoppingListEntity :tabindex="index+1" :listEntity="uncheckedEntity" :count="uncheckedEntity.count" />
        </div>
    </div>
        <div id="checked_list">
            <div v-for="(checkedEntity, index) in checkedEntities" :key="index">
                <ShoppingListEntity :tabindex="index+1" :listEntity="checkedEntity" :count="checkedEntity.count" />
            </div>
        </div>
    </div>
    <div v-else><h3>Ingen varer i handlelisten!</h3></div>
</div>
</template>

<script>
import ShoppingListEntity from "@/components/ShoppingList/shoppingListEntity.vue";
import shoppingListService from "@/services/shoppingListService";
import {tokenStore} from "@/stores/tokenStore";
import {shoppingListStore} from "@/stores/shoppingListStore";

export default {
    name: "shoppingListGrid",
    components: {ShoppingListEntity},
    data(){
        return{
            loading:true,
            uncheckedEntities:Array,
            checkedEntities:Array,
        }
    },
    methods:{
        shoppingListStore,
        updateChecked(){
            let uncheckedEntities = []
            for (const entity of shoppingListStore().getShoppingListEntities()) {
                console.log(entity.foundInStore)
                if(!entity.foundInStore){
                    uncheckedEntities.push(entity)
                }
            }
            let checkedEntities = []
            for (const entity of shoppingListStore().getShoppingListEntities()) {
                if(entity.foundInStore){
                    checkedEntities.push(entity)
                }
            }
            this.uncheckedEntities=uncheckedEntities
            this.checkedEntities=checkedEntities
        },
    },
    async created(){
        let listEntities = []
        try {
            let shoppingListResponse = await shoppingListService.getProducts(tokenStore().user.jwt)
            let shoppinglistEntities = shoppingListResponse.data
            for (let shoppinglistEntity of shoppinglistEntities) {
                listEntities.push(shoppinglistEntity)
            }
        }catch (error){
            console.log(error)
        }finally
        {
           this.loading=false
        }
        shoppingListStore().setShoppingListEntities(listEntities)
        this.updateChecked();
    }
}
</script>

<style scoped>
#shoppingListEntitiesGrid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap:5px;
}

#unchecked_list{
    border: 1px solid steelblue;
    padding: 10px;
    border-radius: 5px;
}
#checked_list{
    border: 1px solid steelblue;
    padding: 10px;
    border-radius: 5px;
}
</style>