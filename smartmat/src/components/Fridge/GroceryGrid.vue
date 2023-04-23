<template>
    <div class="container">
        <div v-if="fridgeEntities.length > 0" id="grocery_grid">
            <div v-for="(fridgeEntity, index) in fridgeEntities" :key="fridgeEntity.id">
           <GroceryComponent :tabindex="index+1" :grocery="fridgeEntity.grocery" :count="fridgeEntity.count" />
            </div>
        </div>
        <div v-else><h1>No groceries :(</h1></div>
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
            fridgeEntities:[]
        }
    },
    methods:{
    },
    async created(){
        let additionalGroceries = [{id:4,count:4, account:{username:"Emil"}, grocery:{id:1, name:"Melk", category:{id:1,name:"Melk og melkeprodukter"}}},
            {id:5,count:1, account:{username:"Emil"}, grocery:{id:1, name:"Melk", category:{id:1,name:"Melk og melkeprodukter"}}}
        ]
        for(let grocery of additionalGroceries){
            this.fridgeEntities.push(grocery)
        }
        console.log(tokenStore().user.jwt)
        try {
            let groceries = await fridgeService.getGroceries(tokenStore().user.username, tokenStore().user.jwt)
            for (let grocery of groceries) {
                this.fridgeEntities.push(grocery)
            }
        }catch (error){
            console.log(error)
        }
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
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 1%;
    margin: auto;
}
.grocery{
    height: fit-content;
    width: 100%;
}
#count{
    width: 100%;
}

@media only screen and (max-width: 1400px) {
    #grocery_grid{
        grid-template-columns: repeat(4, 1fr)
    }
}
@media only screen and (max-width: 1200px) {
    #grocery_grid{
        grid-template-columns: 1fr 1fr 1fr
    }
}
@media only screen and (max-width: 900px) {
    #grocery_grid{
        grid-template-columns: 1fr 1fr}
}
@media only screen and (max-width: 600px) {
    #grocery_grid{
        grid-template-columns: 1fr }
}
</style>