import axios from 'axios';

const recipeApiClient = axios.create({
    baseURL: 'http://localhost:8080/recipes',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});
const shoppingListApiClient = axios.create({
    baseURL: 'http://localhost:8080/shoppingList',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

/**
 * Returns an object with an Authorization header containing a bearer token.
 * @param {string} token - The bearer token to be included in the Authorization header.
 * @returns {Object} An object with an Authorization header containing the provided bearer token.
 */

function addHeader(token) {
    return {
        headers: {
            "Authorization": "Bearer " + token
        },
    }
}

export default {
    /**
     * Retrieves the week menu based on the specified number of servings and number of days, using the given access token.
     * @param {string} token - The access token used for authentication.
     * @param {number} servingsNr - The number of servings desired for each recipe in the week menu.
     * @param {number} nDays - The number of days for which the week menu should be generated.
     * @returns {Promise} A promise that resolves with the week menu data returned by the server or rejects with an error.
     */

    getWeekMenu(token, servingsNr, nDays) {
        console.log(servingsNr)
        console.log(nDays)
        return recipeApiClient.get('/weekMenu/' + servingsNr + '/' + nDays, addHeader(token))
    },
    /**
     * Sends a request to the server to create a new recipe with the given recipes data and servings number and with the provided access token.
     * @param {string} token - The access token used to authenticate the request.
     * @param {object} recipes - The data of the new recipe to be created.
     * @param {number} servingsNr - The number of servings the recipe should be created for.
     * @returns {Promise} A Promise that resolves with the response data if the request is successful, or rejects with an error otherwise.
     */
    getNewRecipe(token, recipes, servingsNr) {
        return recipeApiClient.post('/newRecipe/' + servingsNr, recipes, addHeader(token))
    },
    /**
     * Retrieves a single recipe with the provided access token.
     * @param {string} token - The access token used for authentication.
     * @returns {Promise} A promise that resolves with the recipe data returned by the server or rejects with an error.
     */
    getRecipe(token) {
        return recipeApiClient.get('/asdasd', addHeader(token))
    },
    /**
     * Adds all recipes in the week menu to the shopping list using the provided access token.
     * @param {string} token - The access token used for authentication.
     * @param {object[]} menuRecipes - An array of objects containing the recipes data to be added to the shopping list.
     * @returns {Promise} A promise that resolves with the response data if the request is successful, or rejects with an error otherwise.
     */
    addToShoppingList(token, menuRecipes) {
        return shoppingListApiClient.post('/addAllFromMenu', menuRecipes, addHeader(token))
    },
    /**
     * Sends a request to the server to save recipes with the provided access token and recipes data.
     * @param {string} token - The access token used to authenticate the request.
     * @param {Array} recipes - An array of recipe objects to be saved.
     * @returns {Promise} A Promise that resolves with the response data if the request is successful, or rejects with an error otherwise.
     */
    saveRecipes(token, recipes) {
        console.log(recipes)
        return recipeApiClient.post('/saveRecipes', recipes, addHeader(token))
    },
    /**
     * Sends a request to the server to retrieve the saved week menu with the provided access token.
     * @param {string} token - The access token used to authenticate the request.
     * @returns {Promise} A Promise that resolves with the response data if the request is successful, or rejects with an error otherwise.
     */
    getSavedWeekMenu(token) {
        return recipeApiClient.get("/getSavedWeekMenu", addHeader(token))
    },
    /**
     * Sends a request to the server to replace a recipe with the provided access token and recipe data.
     * @param {string} token - The access token used to authenticate the request.
     * @param {object} recipes - The data of the recipe to be replaced.
     * @returns {Promise} A Promise that resolves with the response data if the request is successful, or rejects with an error otherwise.
     */
    replaceRecipe(token, recipes) {
        return recipeApiClient.post("/replaceRecipe", recipes, addHeader(token))
    }
}