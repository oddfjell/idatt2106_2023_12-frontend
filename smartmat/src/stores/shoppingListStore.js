import {defineStore} from "pinia";
import {ref} from "vue";

export const shoppingListStore = defineStore("shoppingList", () => {
    const shoppingList = ref({
        shoppingListEntities: [],
        shoppingListSuggestions: [],
        saved: true
    });
    /**
     * Gets the shopping list entities from the shoppingList reactive object
     * @function
     * @returns {Array} - An array of shopping list entities
     */
    const getShoppingListEntities = () => {
        return shoppingList.value.shoppingListEntities
    }
    /**
     * Gets the shopping list suggestions from the shoppingList reactive object
     * @function
     * @returns {Array} - An array of suggested shopping list entities
     */
    const getShoppingListSuggestions = () => {
        return shoppingList.value.shoppingListSuggestions
    }
    /**
     * Sets the shopping list entities in the shoppingList reactive object
     * @function
     * @param {Array} newShoppingListEntities - The new array of shopping list entities to set
     */
    const setShoppingListEntities = (newShoppingListEntities) => {
        shoppingList.value.shoppingListEntities = newShoppingListEntities
    }
    /**
     * Sets the shopping list suggestions in the shoppingList reactive object
     * @function
     * @param {Array} newSuggestions - The new array of shopping list suggestions to set
     */
    const setShoppingListSuggestions = (newSuggestions) => {
        shoppingList.value.shoppingListSuggestions = newSuggestions
    }
    /**
     * Adds a shopping list entity to the shoppingList reactive object
     * @function
     * @param {Object} newShoppingListEntity - The new shopping list entity to add
     */
    const addShoppingListEntity = (newShoppingListEntity) => {
        let shoppingListEntity = shoppingList.value.shoppingListEntities.find((shoppingListEntity) => shoppingListEntity.name === newShoppingListEntity.name)
        if (shoppingListEntity) {
            shoppingListEntity.count++
        } else {
            shoppingList.value.shoppingListEntities.push(newShoppingListEntity)
        }
    }
    /**
     * Updates a suggested shopping list entity in the shoppingList reactive object
     * @function
     * @param {Object} newShoppingListEntity - The updated shopping list entity
     */
    const updateSuggestion = (newShoppingListEntity) => {
        let shoppingListEntity = shoppingList.value.shoppingListSuggestions.find((shoppingListEntity) => shoppingListEntity.name === newShoppingListEntity.name)
        if (!shoppingListEntity) {
            shoppingList.value.shoppingListSuggestions.push(newShoppingListEntity)
            shoppingListEntity = shoppingList.value.shoppingListSuggestions.find((shoppingListEntity) => shoppingListEntity.name === newShoppingListEntity.name)
        }
        shoppingListEntity.suggestion = true;
    }
    /**
     * Updates a shopping list entity in the shoppingList reactive object
     * @function
     * @param {Object} updatedEntity - The updated shopping list entity
     * @returns {boolean} - A boolean indicating if the entity was updated successfully
     */
    const updateShoppingListEntity = (updatedEntity) => {
        let shoppingListEntity = shoppingList.value.shoppingListEntities.find((shoppingListEntity) => shoppingListEntity.name === updatedEntity.name)
        if (shoppingListEntity) {
            shoppingListEntity = updatedEntity
            return true;
        } else return false
    }
    /**

     Retrieves the current state of the "saved" property in the shopping list store.
     @returns {boolean} - The current value of the "saved" property.
     */
    const getStateSaved = () => {
        return shoppingList.value.saved
    }
    /**

     Sets the "saved" property in the shopping list store to the specified boolean value.
     @param {boolean} boolean - The boolean value to set the "saved" property to.
     */
    const setStateSaved = (boolean) => {
        shoppingList.value.saved = boolean
    }

    return {
        getShoppingListEntities,
        getShoppingListSuggestions,
        setShoppingListEntities,
        setShoppingListSuggestions,
        addShoppingListEntity,
        updateShoppingListEntity,
        getStateSaved,
        setStateSaved,
        shoppingList,
        updateSuggestion
    };
})

