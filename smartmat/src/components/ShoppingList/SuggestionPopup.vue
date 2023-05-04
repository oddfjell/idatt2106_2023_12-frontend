<template>

  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="popup-overlay">
    <div class="popup-container">
      <h1 class="writing">FORSLAG</h1>
      <span class="material-symbols-outlined" @click="close" id="popup-close">close</span>
      <ul>
        <li v-for="(suggestion, index) in list" :key="index">
          <p class="writing">
          {{suggestion.name}}
          </p>
           <div class="buttons">
            <button id="aksepter" @click="accept(suggestion)">Aksepter</button>
            <button id="forkast" @click="delSuggestion(suggestion)">Forkast</button>
          </div>
        </li>
      </ul>
    </div>
  </div>


</template>

<script>

import shoppingListService from "../../services/shoppingListService";
import {tokenStore} from "../../stores/tokenStore";
import {shoppingListStore} from "../../stores/shoppingListStore";

export default {
  name: "SuggestionPopup",

  props:{
    suggestionList: Object
  },
  data(){
    return {
      list: []
    }
  },
  mounted() {
    this.list = this.suggestionList;
  },

  methods:{
    close(){
      this.$emit("closePopup");
    },
    async accept(grocery) {
      try {
        await shoppingListService.suggestGrocery(grocery, tokenStore().user.jwt)
        this.list.splice(this.list.indexOf(grocery),1);
        shoppingListStore().addShoppingListEntity(grocery);
        this.$emit("acceptedSuggestion")
      }catch (error){
        console.log(error)
      }
    },
    async delSuggestion(grocery){
      try {
        await shoppingListService.deleteSuggestion(grocery, tokenStore().user.jwt);
        this.list.splice(this.list.indexOf(grocery),1);
      }catch (error){
        console.log(error)
      }
    }
  }

}




</script>

<style scoped>


@import "../../assets/style/suggestionPopup.css";

</style>