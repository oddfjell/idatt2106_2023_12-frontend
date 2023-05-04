<template>

  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="popup-overlay">
    <div class="popup-container">
      <h1>FORSLAG</h1>
      <span class="material-symbols-outlined" @click="close" id="popup-close">close</span>
      <ul>
        <li v-for="(suggestion, index) in list" :key="index">
          {{suggestion.name}}
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


.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  position: relative;
  background-color: #fff;
  width: 25em;
  max-width: 90%;
  padding: 2.5em;
  border-radius: 2em;
  box-shadow: 0 0 4em rgba(0, 0, 0, 0.5);
  height: 70%;
  text-align: center;
}


.popup-title {
  margin-top: 0;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  color: #333;
}


.popup-input {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 2em;
  font-size: 1em;
  border: none;
  border-radius: 0.5em;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.2);
}


.popup-button {
  color: #fff;
  padding: 1em 2em;
  border: none;
  border-radius: 3em;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  margin: 0 auto;
  width: 50%;
}

#login{
  background: #6dbd5e;
}

#delete{
  background: red;
}

#login:hover{
  background: black;
}

#delete:hover{
  background: black;
}


#popup-close {
  position: absolute;
  top: 1em;
  right: 1em;
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: color 0.3s;
}


#popup-close:hover {
  color: #de1726;
}

.material-symbols-outlined {
  float: right;
  font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48
}

.material-symbols-outlined:hover {
  cursor: pointer;
}

li{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin:auto;
  padding-top: 5%;
  font-size: 2em;
  border-bottom: 1px solid lightblue;
}

ul{
  margin: auto;
  width: 100%;
  align-items: center;
  text-align: center;
  height: 80%;
  box-shadow: rgba(0, 0, 0, 0.25) 0vh 4vh 7vh, rgba(0, 0, 0, 0.22) 0vh 3vh 3vh;
  padding: 0;
}

button{
  min-width: 30%;
  font-size: 60%;
  cursor: pointer;
}

.buttons{
  display: flex;
  gap: 1em;
  margin: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
}

#aksepter{
  background-color: #048100;
  color: white;
}

#forkast{
  background-color: red;
  color: white;
}



</style>