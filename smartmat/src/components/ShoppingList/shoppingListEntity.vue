<template>
  <div id="container">
    <div id="item">
      <input v-if="!restricted" type="checkbox" :checked="listEntity.foundInStore" @change="updateChecked">
      <p id="grocery-item">{{ listEntity.name }}</p>
    </div>
    <div class="counter">
      <button v-if="!restricted" class="buttons" id="decrement" :disabled="listEntity.count<=1"
              @click.prevent="decrement">-
      </button>
      <span v-if="!restricted" id="number">{{ listEntity.count }}</span>
      <button v-if="!restricted" class="buttons" id="increment" :disabled="listEntity.count>=99"
              @click.prevent="increment">+
      </button>
      <span v-if="!restricted" class="material-symbols-outlined" @click.prevent="resetCounter">delete</span>
    </div>
  </div>
</template>

<script>

import {shoppingListStore} from "@/stores/shoppingListStore";
import {tokenStore} from "../../stores/tokenStore";

export default {
  name: "shoppingListEntity",
  components: {},
  props: {
    listEntity: Object,

  },
  /**
   * Computed property that checks if the user is restricted from modifying the shopping list.
   * It returns the value of the "restricted" property in the tokenStore.
   *
   * @returns {boolean} - A boolean value indicating if the user is restricted or not.
   */

  computed: {
    restricted() {
      return tokenStore().user.restricted;
    }
  },

  methods: {
    /**

     Updates the checked status of a shopping list entity and emits an event to notify parent components of the change.
     @param {Event} event - The change event object triggered by a checkbox input.
     @returns {void}
     */
    updateChecked(event) {
      let listEntityCopy = this.listEntity
      listEntityCopy.foundInStore = event.target.checked
      shoppingListStore().updateShoppingListEntity(listEntityCopy)
      shoppingListStore().setStateSaved(false)
      this.$emit("updateChecked")
    },
    /**
     * Decrements the count of the shopping list entity by 1 if it is greater than 1.
     * Updates the copy of the entity in the shopping list store and sets the stateSaved flag to false.
     */
    decrement() {
      if (this.listEntity.count > 1) {
        let listEntityCopy = this.listEntity
        listEntityCopy.count--
        shoppingListStore().updateShoppingListEntity(listEntityCopy)
        shoppingListStore().setStateSaved(false)
      }
    },
    /**
     * Increments the count of a shopping list entity by 1, if the count is less than 100.
     * Copies the original entity, updates its count, and then calls the updateShoppingListEntity()
     * method of the shopping list store to update the entity in the store.
     * Also sets the stateSaved flag of the shopping list store to false, indicating that the
     * state has been modified but not yet saved.
     */

    increment() {
      if (this.listEntity.count < 100) {
        let listEntityCopy = this.listEntity
        listEntityCopy.count++
        shoppingListStore().updateShoppingListEntity(listEntityCopy)
        shoppingListStore().setStateSaved(false)
      }
    },
    /**
     * Resets the count of the shopping list entity to 0 and emits an "updateChecked" event.
     * Updates the shopping list entity in the shopping list store and sets the stateSaved flag to false.
     */
    resetCounter() {
      let listEntityCopy = this.listEntity
      listEntityCopy.count = 0
      shoppingListStore().updateShoppingListEntity(listEntityCopy)
      shoppingListStore().setStateSaved(false)
      this.$emit("updateChecked")
    }
  },
}
</script>

<style scoped>
@import "../../assets/style/shoppingList.css";

</style>