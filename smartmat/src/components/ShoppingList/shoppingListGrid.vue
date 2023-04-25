<template>
<div>
    <div v-if="loading">Laster ...</div>
    <div v-else-if="shoppingListEntities.length" id="shoppingList_grid">
        <div v-for="(shoppingListEntity, index) in shoppingListEntities" :key="shoppingListEntity">
            <ShoppingListEntity :tabindex="index+1" :listEntity="shoppingListEntity" :count="shoppingListEntity.count" />
        </div>
    </div>
    <div v-else><h1>Ingen varer i handlelisten!</h1></div>
</div>
</template>

<script>
import ShoppingListEntity from "@/components/ShoppingList/shoppingListEntity.vue";
import shoppingListService from "@/services/shoppingListService";
import {tokenStore} from "@/stores/tokenStore";

export default {
    name: "shoppingListGrid",
    components: {ShoppingListEntity},
    data(){
        return{
            loading:true,
            shoppingListEntities:null
        }
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
        this.shoppingListEntities=listEntities
        console.log(this.shoppingListEntities)
    }
}
</script>

<style scoped>
#shoppingList_grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30%;
}
</style>