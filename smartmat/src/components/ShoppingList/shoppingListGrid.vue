<template>
  <div>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap" rel="stylesheet">
    <button class="buttons" id="show-list" @click="toggleCheckedList"> {{ toggleBtnText }}</button>
    <div v-if="uncheckedEntities || checkedEntities" id="shoppingListEntitiesGrid">
      <div id="unchecked_list">
        <h3 v-if="!tokenStore().user.restricted" class="font">Ikke valgt</h3>
        <h3 v-else-if="tokenStore().user.restricted" class="font">Forslag</h3>
        <ul>
          <li v-for="(uncheckedEntity, index) in uncheckedEntities" :key="uncheckedEntity.name">
            <ShoppingListEntity :tabindex="index+1" :listEntity="uncheckedEntity" @updateChecked="updateChecked"
                                :count="uncheckedEntity.count"/>
          </li>
        </ul>
      </div>
      <div id="checked_list">
        <h3 v-if="!tokenStore().user.restricted" class="font">Valgt</h3>
        <h3 v-else-if="tokenStore().user.restricted" class="font">Handlelisten</h3>
        <ul>
          <li v-for="(checkedEntity, index) in checkedEntities" :key="checkedEntity.name">
            <ShoppingListEntity :tabindex="index+1" :listEntity="checkedEntity" @updateChecked="updateChecked"
                                :count="checkedEntity.count"/>
          </li>
        </ul>

        </div>
    </div>
    <div v-else><h3>Ingen varer i handlelisten!</h3></div>
</div>
</template>

<script>
import ShoppingListEntity from "@/components/ShoppingList/shoppingListEntity.vue";
import {shoppingListStore} from "@/stores/shoppingListStore";
import {tokenStore} from "@/stores/tokenStore";

export default {
  name: "shoppingListGrid",
  components: {ShoppingListEntity},
  /**
   * Returns an object containing the initial reactive data for the component, including:
   * uncheckedEntities: an empty array to hold the shopping list entities that are not yet checked off
   * checkedEntities: an empty array to hold the shopping list entities that are checked off
   * toggleBtnText: a string to hold the text for the toggle button, which will display either "Vis handleliste"
   * or "Vis valgte", depending on the value of `tokenStore().user.restricted`
   * @returns {Object} an object containing the initial reactive data for the component
   */
  data() {
    return {
      uncheckedEntities: Array,
      checkedEntities: Array,
      toggleBtnText: (tokenStore().user.restricted) ? "Vis handleliste" : "Vis valgte",
    }
  },
  methods: {
    tokenStore,
    shoppingListStore,
    /**
     * Updates the checked and unchecked entities based on the entities in the shopping list store.
     * It populates the unchecked entities array with the entities that have not been found in a store and have a non-zero count,
     * and populates the checked entities array with the entities that have been found in a store and have a non-zero count.
     * Sets the unchecked and checked entities arrays in the component's data.
     */

    updateChecked() {
      let uncheckedEntities = []
      for (const entity of shoppingListStore().getShoppingListEntities()) {
        if (!entity.foundInStore && entity.count !== 0) {
          uncheckedEntities.push(entity)
        }
      }
      let checkedEntities = []
      for (const entity of shoppingListStore().getShoppingListEntities()) {
        if (entity.foundInStore && entity.count !== 0) {
          checkedEntities.push(entity)
        }
      }
      this.uncheckedEntities = uncheckedEntities
      this.checkedEntities = checkedEntities
    },
    /**
     * Updates the arrays of suggested and checked entities based on the shopping list suggestions and entities
     * available in the shoppingListStore.
     * The method first retrieves all shopping list suggestions and adds them to the suggestedEntities array.
     * Then, it retrieves all shopping list entities and adds them to the shoppinglistEntities array.
     * Finally, it sets the suggestedEntities array to the uncheckedEntities array and sets the shoppinglistEntities
     * array to the checkedEntities array.
     */
    updateSuggestionChecked() {
      let suggestedEntities = []
      for (const entity of shoppingListStore().getShoppingListSuggestions()) {
        suggestedEntities.push(entity)
      }

      let shoppinglistEntities = []
      for (const entity of shoppingListStore().getShoppingListEntities()) {
        shoppinglistEntities.push(entity)
      }
      this.uncheckedEntities = suggestedEntities
      this.checkedEntities = shoppinglistEntities
    },
    /**
     * Toggles the visibility of the checked and unchecked shopping list items, as well as updates
     * the toggle button text based on the user's restrictions.
     */
    toggleCheckedList() {
      let checkedList = document.querySelector("#checked_list")
      let uncheckedList = document.querySelector("#unchecked_list")
      if (checkedList.style.display === "block") {
        checkedList.style.display = "none"
        uncheckedList.style.display = "block"
        if (tokenStore().user.restricted) {
          this.toggleBtnText = "Vis handleliste"
        } else {
          this.toggleBtnText = "Vis valgte"
        }
      } else {
        checkedList.style.display = "block"
        uncheckedList.style.display = "none"
        if (tokenStore().user.restricted) {
          this.toggleBtnText = "Vis forslag"
        } else {
          this.toggleBtnText = "Vis ikke valgte"
        }

      }
    }
  },
  /**
   * Vue.js lifecycle hook that is called when the component is mounted onto the DOM.
   * In this case, the updateChecked() method is called when the component is mounted.
   */
  mounted() {
    this.updateChecked();
  },
}
</script>

<style scoped>
@import "../../assets/style/shoppingList.css";

</style>