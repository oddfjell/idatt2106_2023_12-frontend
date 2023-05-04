<template>
    <div class="container" >
        <div id="grocery-left">
            <h3 id="title">{{grocery.name}}</h3>
            <p id="count">Antall: {{count}}</p>
        </div>
        <div id="grocery-right">
          <p id="category">{{grocery.categoryName}}</p>
          <p class="right" :class="   {red:expiredWarning}" >{{expiredText}}</p>

          <div class="buttonBar">
              <button class="Btn" id="eatBtn" @click="onEat">Spist</button>
              <Throw :grocery="grocery"/>
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
          let deletedProduct = {name:this.grocery.name, count:1, categoryId: this.grocery.categoryId}
        await fridgeService.removeGrocery(deletedProduct, tokenStore().user.jwt)
       location.reload();
      }
    },
    computed:{
        expiredText(){
            if(this.grocery.expiresInDays>3){
                return this.grocery.expiresInDays + " dager igjen"
            } else if(this.grocery.expiresInDays===1){
                return  "Utgår om 1 dag"
            } else if(this.grocery.expiresInDays===0) {
                return "Utgår i dag"
            }else if(this.grocery.expiresInDays===-1){
                return "Utgått for 1 dag siden"
            } else if(this.grocery.expiresInDay<0){
                return "Utgått for " -this.grocery.expiresInDays + "dager siden"
            } else{
                return ""
            }
        },
        expiredWarning(){
          return this.grocery.expiresInDays <= 3;
        }
    },

}
</script>
<style scoped>
@import "../../assets/style/Grocery.css";
</style>