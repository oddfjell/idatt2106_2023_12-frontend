<template>
    <div class="container">
        <div v-if="groceries.length > 0" id="grocery_grid">
           <GroceryComponent/>
        </div>
        <div v-else><h1>No groceries :(</h1></div>
    </div>
</template>

<script>
import GroceryComponent from "@/components/Grocery.vue";
import fridgeService from "@/services/fridgeService";
import {tokenStore} from "@/stores/tokenStore";
import grocery from "@/components/Grocery.vue";

export default {
    name: "FrontPageView.vue",
    components: {GroceryComponent},
    data(){
        return{
            groceries:[]
        }
    },
    methods:{
    },
    async created(){
        let additionalGroceries = []
        for(let grocery of additionalGroceries){
            this.groceries.push(grocery)
        }
        console.log(tokenStore().user.jwt)
        let groceries = await fridgeService.getGroceries(tokenStore().user.username, tokenStore().user.jwt )
        for(let grocery of groceries){
            this.groceries.push(grocery)
        }
    },
}
</script>

<style scoped>
#grocery_grid{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 2%;
    margin-top: 30px;
    margin-left: 5%;
    margin-right: 5%;
}
.grocery{
    height: fit-content;
    width: 100%;
}
.hoverborder{
    border:solid transparent 4px;
    border-radius: 10px;
}
.hoverborder:hover{
    border: solid #1abc9c 4px;
}
@media only screen and (max-width: 800px) {
    #grocery_grid{
        grid-template-columns: 1fr 1fr 1fr
    }
}
@media only screen and (max-width: 600px) {
    #grocery_grid{
        grid-template-columns: 1fr 1fr}
}
@media only screen and (max-width: 350px) {
    #grocery_grid{
        grid-template-columns: 1fr }
}
</style>