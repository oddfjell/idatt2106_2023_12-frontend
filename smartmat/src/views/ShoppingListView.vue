<template>
  <div v-if="username" class="container">
    <h1>Handleliste</h1>
    <div id="header">
      <!-- The shopping list dropdown component -->
      <Dropdown id="dropdown"
                :options="groceries"
                :placeholder="selectedText"
                v-on:selected="onSelection">
      </Dropdown>
      <!-- Button for adding the selected item to shoppinglist -->
      <button class="Btn GreyBtn" @click="addShoppingListEntity">Legg til vare</button>
    </div>
    <div class="container" id="shoppingGridContainer">
      <!-- Text field for displaying information to the user -->
      <p id="info">{{ info }}</p>
      <div id="buttonBar" class="Btn">
        <!-- Button for saving changes related to the shoppinglist-->
        <button class="BlueBtn" id="saveChanges" @click="save">Lagre endringer</button>
        <!-- Button for moving checked items to the fridge, and removing them from the shoppinglist-->
        <button class="BlueBtn" id="addSelected" @click="buy">Kjøp valgte varer</button>
      </div>
      <div v-if="loading"><h3 style="text-align: center">Laster ...</h3></div>
      <!-- ShoppinglistGrid component, for displaying items in the shoppinglist, if none: textField is displayed -->
      <ShoppingListGrid ref="grid" v-else-if="shoppingListStore().getShoppingListEntities().length"/>
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
  components: {ShoppingListGrid, Dropdown},
  /**
   * Initial data
   * @returns {{selectedText: string, trigger: boolean, loading: boolean, groceries: [], selected: null, info: string}}
   */
  data() {
    return {
      selectedText: "Søk etter vare",
      selected: null,
      groceries: [],
      loading: true,
      info: " ",
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
        let product = {name: this.selected.name, count: 1, foundInStore: false}
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
          listEntities.push(shoppinglistEntity)
        }
      } catch (error) {
        console.log(error)
      }
      shoppingListStore().setShoppingListEntities(listEntities)
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
    for (let grocery of groceries) {
      this.groceries.push(grocery)
    }
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
    }
  },
}


</script>

<style scoped>
.container {
  max-width: 100vh;
  min-height: 70vh;
  border: 1px solid steelblue;
  padding-bottom: 0;
  padding-top: 0;
}

#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5%;
}

#shoppingGridContainer {
  border: none;
  padding: 0;
}

#dropdown {
  width: 80%;
}

#buttonBar {
  display: flex;
  justify-content: space-evenly;
  margin: 10px;
}

#info {
  text-align: center;
  font-size: large;
  margin: 0;
  padding: 0;
}

.GreyBtn {
  padding-top: 2px;
  padding-bottom: 2px;
}

@media (max-width: 500px ) {
  .container {
    margin: 0;
    padding: 20px;
    border: none;
  }
}
</style>