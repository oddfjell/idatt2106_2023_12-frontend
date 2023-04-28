<template>
    <div class="container">
        <div v-if="loading"><h3 style="text-align: center;">Laster ...</h3></div>
        <div v-else-if="fridgeEntities.length" id="grocery_grid">
            <div v-for="(fridgeEntity, index) in fridgeEntities" :key="fridgeEntity.id">
           <GroceryComponent :tabindex="index+1" :grocery="fridgeEntity" :count="fridgeEntity.count" />
            </div>
        </div>
        <div v-else><h3 style="text-align: center">Ingen varer i kjøleskapet</h3></div>
    </div>
</template>

<script>
import GroceryComponent from "@/components/Fridge/Grocery.vue";
import fridgeService from "@/services/fridgeService";
import {tokenStore} from "@/stores/tokenStore";

export default {
    name: "FrontPageView.vue",
    components: {GroceryComponent},
    data(){
        return{
            loading:true,
            fridgeEntities:null
        }
    },
    methods:{
    },
    async created(){
        let fridgeEntities = [];
        try {
            let groceriesResponse = await fridgeService.getGroceries(tokenStore().user.jwt)
            let groceries = groceriesResponse.data
            for (let grocery of groceries) {
                fridgeEntities.push(grocery)
            }
        }catch (error){
            console.log(error)
        }finally {
         this.loading=false
        }
        this.fridgeEntities=fridgeEntities
        console.log(this.fridgeEntities)
    },
}
</script>

<style scoped>
.container{
    max-width: none;
    padding: 1%;
}
#grocery_grid{
    display:grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5vh;
    margin: auto;
    padding: 10px;
}

@media only screen and (max-width: 1420px) {
    #grocery_grid{
        grid-template-columns: repeat(4, 1fr)
    }
}
@media only screen and (max-width: 2000px) {
    #grocery_grid{
        grid-template-columns: 1fr 1fr 1fr
    }
}
@media only screen and (max-width: 1400px) {
    #grocery_grid{
        grid-template-columns: 1fr 1fr}
}
@media only screen and (max-width: 720px) {
    #grocery_grid{
        grid-template-columns: 1fr }
}
</style>