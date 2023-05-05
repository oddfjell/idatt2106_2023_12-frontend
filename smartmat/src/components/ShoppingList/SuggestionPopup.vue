<template>

  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
  <div class="popup-overlay">
    <div class="popup-container">
      <h1 class="writing">FORSLAG</h1>
      <span class="material-symbols-outlined" @click="close" id="popup-close">close</span>
      <ul>
        <li v-for="(suggestion, index) in list" :key="index">
          <p class="writing">
            {{ suggestion.name }}
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

  props: {
    suggestionList: Object
  },
  /**
   * Returns the initial data object for the SuggestionPopup component.
   *
   * @returns {Object} An object with a `list` property initialized to an empty array.
   */

  data() {
    return {
      list: []
    }
  },
  /**
   * Lifecycle hook called after the component has been mounted. Sets the component's data
   * property 'list' to the value of the 'suggestionList' prop passed to the component.
   * @returns {void}
   */
  mounted() {
    this.list = this.suggestionList;
  },
  /**
   * Closes the popup by emitting a "closePopup" event.
   */

  methods: {
    close() {
      this.$emit("closePopup");
    },
    /**

     Async method that accepts a grocery suggestion by sending a POST request to the server.
     Removes the accepted suggestion from the list and adds it to the shopping list.
     Emits an "acceptedSuggestion" event to notify the parent component that a suggestion has been accepted.
     @param {Object} grocery - The grocery object to be accepted
     @throws {Error} if the request to accept the suggestion fails
     @returns {Promise<void>}
     */
    async accept(grocery) {
      try {
        await shoppingListService.suggestGrocery(grocery, tokenStore().user.jwt)
        this.list.splice(this.list.indexOf(grocery), 1);
        shoppingListStore().addShoppingListEntity(grocery);
        this.$emit("acceptedSuggestion")
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Delete a suggested grocery from the suggestion list and from the backend server.
     * @param {Object} grocery - The grocery object to be deleted.
     * @throws {Error} If the request fails.
     * @returns {Promise} A Promise that resolves when the grocery is deleted from the server.
     */
    async delSuggestion(grocery) {
      try {
        await shoppingListService.deleteSuggestion(grocery, tokenStore().user.jwt);
        this.list.splice(this.list.indexOf(grocery), 1);
      } catch (error) {
        console.log(error)
      }
    }
  }

}


</script>

<style scoped>


@import "../../assets/style/suggestionPopup.css";

</style>