<template>
    <div id="container">
    <input type="checkbox" :checked="listEntity.foundInStore" @change="updateValue">
        <p>{{ listEntity.name }}</p>
        <p>{{listEntity.count}}</p>
        <button class="button" @click="remove" >-</button>
       <!--<VueNumberInput :model-value="listEntity.count" @update:model-value="updateValue" /> //TODO -->
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
.button{
    height: fit-content;
}

</style>