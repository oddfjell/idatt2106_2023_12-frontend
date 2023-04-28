<template>
  <div v-if="username" class="container">
  <h1>Handleliste</h1>
      <div id="header">
      <Dropdown id="dropdown"
              :options="groceries"
                :placeholder="selectedText"
              v-on:selected="onSelection">
      </Dropdown>
          <button class="Btn GreyBtn" @click="addShoppingListEntity">Legg til vare</button>
      </div>
      <div class="container" id="shoppingGridContainer">
          <p id="info">{{info}}</p>
          <div id="buttonBar" class="Btn">
              <button class="BlueBtn" id="saveChanges" @click="save">Lagre endringer</button>
              <button class="BlueBtn" id="addSelected" @click="buy">Kjøp valgte varer</button>
          </div>
          <div v-if="loading"><h3 style="text-align: center">Laster ...</h3></div>
     <ShoppingListGrid ref="grid" v-else-if="shoppingListStore().getShoppingListEntities().length" :update="trigger"/>
          <div v-else><h3 style="text-align: center"> Du har ikke noe i handlelisten</h3></div>
      </div>
  </div>
  <div v-else>
      <h1>Please log in</h1>
  </div>
</template>

<script>

import {tokenStore} from "@/stores/tokenStore";
import groceryService from "@/services/groceryService";
import Dropdown from '@/components/Common/Dropdown.vue';
import shoppingListService from "@/services/shoppingListService";
import ShoppingListGrid from "@/components/ShoppingList/shoppingListGrid.vue";
import router from "@/router";
import {shoppingListStore} from "@/stores/shoppingListStore";

export default {
  name: "ShoppingList",
    components:{ShoppingListGrid, Dropdown},
    data(){
      return{
          selectedText:"Søk etter vare",
          selected:null,
          groceries:[],
          loading:true,
          trigger:false,
          info:" ",
          saved:true
      }
    },
    methods:{
        shoppingListStore,
        onSelection(selection) {
            if(selection!==null && selection !==undefined) {
                this.selected = selection;
                this.selectedText = selection.name
            } else{
                this.selectedText="Søk etter vare"
            }
        },
        async buy(){
            try {
                await this.save()
                this.saved=true
                this.info = "Legger til i handleliste ..."
                await shoppingListService.buyChecked(tokenStore().user.jwt)
                shoppingListStore().setShoppingListEntities([])
                this.info = "Lagt til!"
            }catch (error){
                console.log(error)
            }
        },
        async save(){
            this.info="Lagrer... "
            try{
                await shoppingListService.saveChanges(shoppingListStore().getShoppingListEntities(), tokenStore().user.jwt)
                this.saved=true
                this.info="Lagret!"
            } catch (error){
                console.log(error)
                this.info="Kunne ikke lagre"
            }
        },
        async addShoppingListEntity(){
            let product = {name:this.selected.name, count: 1, foundInStore:false}
            shoppingListStore().addShoppingListEntity(product)
            this.trigger=!this.trigger
            this.onSelection(null)
            if(this.$refs.grid){this.$refs.grid.updateChecked()}
        },
    },
    async created() {
      //get shoppingListEntities and update Store
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

        //Get groceries from database
       let groceriesResponse = await groceryService.getProducts(tokenStore().user.jwt)
        let groceries = groceriesResponse.data
        for(let grocery of groceries){
            this.groceries.push(grocery)
        }
    },
    mounted() {
        if(!tokenStore().user.username){
            router.push("/")
        }
    },
    async beforeUnmount() {
        if(!this.saved){
            if(confirm("You have unsaved changes. Save?")){
                await this.save()
                alert("Saved!")
            }
        }
    },
    computed:{
        username(){
            return tokenStore().user.username
        }
    },
}


</script>

<style scoped>
.container{
    max-width: 100vh;
    min-height: 50vh;
    border: 1px solid steelblue;
    padding-bottom: 0;
    padding-top: 0;
}
#header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5%;
}
#shoppingGridContainer{
    border: none;
    padding: 0;
}

#dropdown{
    width:80%;
}

#buttonBar{
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
}
#info{
    text-align: center;
    font-size: large;
    margin: 0;
    padding:0;
}
.GreyBtn{
    padding-top: 2px;
    padding-bottom: 2px;
}
</style>