<template>
    <div class="container" >
        <div id="grocery-left">
            <img class="thumbnail" src="@/images/weeklyMenuPage.png" alt="">
            <h3 id="title">{{grocery.name}}</h3>
            <p id="count">Antall: {{count}}</p>
        </div>
        <div id="grocery-right">
        <p id="category">{{grocery.categoryName}}</p>

        <div class="buttonBar">
            <button class="Btn" id="eatBtn" @click="onEat">Spist</button>
            <Throw/>
        </div>
        </div>
</div>
</template>

<script>
import Throw from "@/components/Fridge/Throw.vue";
import fridgeService from "@/services/fridgeService";
import {tokenStore} from "@/stores/tokenStore";

export default {
    name: "GroceryComponent",
    components: {Throw},
    props: {
        grocery:Object,
        count:Number,
    },
    created() {
    },
    methods:{
      async onEat(){
        console.log("elo")
        await fridgeService.removeGrocery(this.grocery, tokenStore().user.jwt)
        //let groceriesResponse = await fridgeService.getGroceries(tokenStore().user.jwt)
      }
    }
}
</script>
<style scoped>
.thumbnail{
    margin: 0;
    width: 50px;
}
#title{
    font-weight: bold;
    width: fit-content;
}
.container{
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

}
#grocery-left{
    margin-left: 0;
}
.Btn{
    border: 0;
    width: fit-content;
    padding: 5%;
    border-radius: 5px;
    margin: 0;
}
#grocery-right{
    margin-right: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.buttonBar{
    margin-right: 0;
    width: 100%;
    align-self: end;

}
#category{
    text-align: end;
}

#eatBtn{
    background: #48bd00;
    color: white;
    float: right;
}

#eatBtn:hover {
    background-color: #048100;
    cursor: pointer;
}
</style>