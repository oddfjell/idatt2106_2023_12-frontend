<template>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
  <div v-if="username && !restricted" class="container" id="frame">
    <div v-if="suggestions.length" class="notifications" id="active">
      <label>Forslag</label>
      <span class="material-symbols-outlined" @click="getSuggestions">notifications_active</span>
    </div>
    <div v-else class="notifications">
      <span class="material-symbols-outlined">notifications</span>
    </div>
    <h1 id="title">Handleliste</h1>
    <div id="header">
      <!-- The shopping list dropdown component -->
      <Dropdown id="dropdown"
                :options="groceries"
                :placeholder="selectedText"
                v-on:selected="onSelection">
      </Dropdown>
      <!-- Button for adding the selected item to shoppinglist -->
      <button class="buttons" @click="addShoppingListEntity">Legg til vare</button>
    </div>
    <div class="container" id="shoppingGridContainer">
      <!-- Text field for displaying information to the user -->
      <p id="info">{{ info }}</p>
      <div id="buttonBar">
        <!-- Button for saving changes related to the shoppinglist-->
        <button class="buttons" id="saveChanges" @click="save">Lagre endringer</button>
        <!-- Button for moving checked items to the fridge, and removing them from the shoppinglist-->
        <button class="buttons" id="addSelected" @click="buy">Kjøp valgte varer</button>
      </div>
      <div v-if="loading"><h3 class="message">Laster...</h3></div>
      <!-- ShoppinglistGrid component, for displaying items in the shoppinglist, if none: textField is displayed -->
      <ShoppingListGrid ref="grid" v-else-if="shoppingListStore().getShoppingListEntities().length"/>
      <div v-else><h3 class="message" id="empty-list"> Du har ikke noe i handlelisten</h3></div>
    </div>
    <div v-if="popup">
      <SuggestionPopup :suggestionList="suggestions" @closePopup="closePopup" @acceptedSuggestion="acceptedSuggestion"></SuggestionPopup>
    </div>


  </div>


  <div v-else-if="username && restricted" class="container" id="frame">
    <h1 id="title">Handleliste</h1>
    <div id="header">
      <!-- The shopping list dropdown component -->
      <Dropdown id="dropdown"
                :options="groceries"
                :placeholder="selectedText"
                v-on:selected="onSelection">
      </Dropdown>
      <!-- Button for adding the selected item to shoppinglist -->
      <button class="buttons" @click="suggestShoppingListEntity">Foreslå en vare</button>
    </div>
    <div class="container" id="shoppingGridContainer">
      <!-- Text field for displaying information to the user -->
      <p id="info">{{ info }}</p>
      <div id="buttonBar">
        <!-- Button for saving changes related to the shoppinglist-->
        <button class="buttons" id="saveChanges" @click="save">Lagre endringer</button>
      </div>
      <div v-if="loading"><h3 class="message">Laster...</h3></div>
      <!-- ShoppinglistGrid component, for displaying items in the shoppinglist, if none: textField is displayed -->
      <ShoppingListGrid ref="grid" v-else-if="shoppingListStore().getShoppingListEntities().length"/>
      <div v-else><h3 class="message" id="empty-list"> Du har ikke noe i handlelisten</h3></div>
    </div>
  </div>


  <div v-else>
    <h1 class="font"> Vennligst logg inn </h1>
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
import SuggestionPopup from "@/components/ShoppingList/SuggestionPopup.vue";

export default {
  name: "ShoppingList",
  components: {SuggestionPopup, ShoppingListGrid, Dropdown},
  /**
   * Initial data
   * @returns {{selectedText: string, trigger: boolean, loading: boolean, groceries: [], selected: null, info: string}}
   */
  data() {
    return {
      selectedText: "Søk etter vare",
      selected: null,
      groceries: [],
      suggestions: [],
      loading: true,
      info: " ",
      popup:false
    }
  },
  methods: {
    /**
     * The pinia-Store
     */
    shoppingListStore,
    /**
     * Function for registering the selected product from the dropdown-menu
     * @param selection - the selected product
     */
    onSelection(selection) {
      if (selection !== null && selection !== undefined) {
        this.selected = selection;
        this.selectedText = selection.name
      } else {
        this.selectedText = "Søk etter vare"
      }
    },
    /**
     * Buy-method. Transfers checked items from the shopping-list to the fridge.
     * First saves items and then calls for the buyChecked- service
     * @returns {Promise<void>}
     */
    async buy() {
      try {
        await this.save()
        shoppingListStore().setStateSaved(true)
        this.info = "Legger til i handleliste ..."
        await shoppingListService.buyChecked(tokenStore().user.jwt)
        this.info = "Lagt til!"
        await this.getListEntities()
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Save-method. Saves current shoppingList-entities and their values
     * @returns {Promise<void>}
     */
    async save() {
      this.info = "Lagrer... "
      try {
        await shoppingListService.saveChanges(shoppingListStore().getShoppingListEntities(), tokenStore().user.jwt)
        shoppingListStore().setStateSaved(true)
        this.info = "Lagret!"
      } catch (error) {
        console.log(error)
        this.info = "Kunne ikke lagre"
      }
    },
    /**
     * Method for adding a new entity to the shopping list. Uses the default values with count:1 and foundInStore:false.
     *  Uses the grid $refs to force an updated list in shoppingListGrid
     * @returns {Promise<void>}
     */
    async addShoppingListEntity() {
      try {
        let product = {name: this.selected.name, count: 1, foundInStore: false, suggestion: false}
        shoppingListStore().addShoppingListEntity(product)
        this.info = "Lagt til " + product.name
        shoppingListStore().setStateSaved(false)
        this.onSelection(null)
        if (this.$refs.grid) {
          this.$refs.grid.updateChecked()
        }
      } catch (error) {
        console.log(error)
        this.info = "Ikke lagt til"
      }
    },
    async suggestShoppingListEntity() {
      try {
        let product = {name: this.selected.name, count: 1, foundInStore: false, suggestion: true}
        shoppingListStore().updateSuggestion(product)
        this.info = "Lagt til " + product.name
        shoppingListStore().setStateSaved(false)
        this.onSelection(null)
        if (this.$refs.grid) {
          this.$refs.grid.updateChecked()
        }
      } catch (error) {
        console.log(error)
        this.info = "Ikke lagt til"
      }
    },
    /**
     * Gets saved list-entities from backend and updates the shoppingListStore.
     * Uses the grid $refs to force an updated list in shoppingListGrid
     * @returns {Promise<void>}
     */
    async getListEntities() {
      let listEntities = []
      try {
        let shoppingListResponse = await shoppingListService.getProducts(tokenStore().user.jwt)
        let shoppinglistEntities = shoppingListResponse.data
        for (let shoppinglistEntity of shoppinglistEntities) {
          if (!shoppinglistEntity.suggestion) {
            listEntities.push(shoppinglistEntity)
          } else {
            this.suggestions.push(shoppinglistEntity);
          }
        }
      } catch (error) {
        console.log(error)
      }
      shoppingListStore().setShoppingListEntities(listEntities)
      if (this.$refs.grid) {
        this.$refs.grid.updateChecked()
      }
    },
    getSuggestions(){
      this.popup = true;
    },
    closePopup(){
      this.popup = false;
    },
    acceptedSuggestion(){
      if (this.$refs.grid) {
        this.$refs.grid.updateChecked()
      }
    }
  },
  /**
   * When created, the view gets list-entities and a list of products from backend.
   * @returns {Promise<void>}
   */
  async created() {

    await this.getListEntities()
    this.loading = false
    //Get groceries from database
    let groceriesResponse = await groceryService.getProducts(tokenStore().user.jwt)
    let groceries = groceriesResponse.data
    if (!this.restricted) {
      for (let grocery of groceries) {
        this.groceries.push(grocery)
      }
    } else {
      for (let grocery of groceries) {
        let shoppingListEntities = shoppingListStore().getShoppingListEntities();
        let found = false;
        for (let shoppingListEntity of shoppingListEntities) {
          if (shoppingListEntity.name === grocery.name) {
            found = true;
          }
        }
        if (!found) {
          this.groceries.push(grocery)
        }
      }
    }

    console.log(shoppingListStore().getShoppingListEntities())

  },

  /**
   * If the user is not logged in, the user is redirected to the login-page
   */
  mounted() {
    if (!tokenStore().user.username) {
      router.push("/")
    }
  },
  /**
   * If there are unsaved changes, the user will be prompted to save those changes before leaving
   * @returns {Promise<void>}
   */
  async beforeUnmount() {
    if (!shoppingListStore().getStateSaved()) {
      if (confirm("You have unsaved changes. Save?")) {
        await this.save()
      }
      shoppingListStore().setStateSaved(true)
    }
  },
  computed: {
    username() {
      return tokenStore().user.username
    },
    restricted() {
      return tokenStore().user.restricted
    }
  },

}


</script>

<style scoped>
@import "../assets/style/shoppingList.css";

</style>