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
function addHeader(token) {
  return {
    headers: {
      "Authorization": "Bearer " + token
    },
  }
}
  export default{
  //add Product
    getWeekMenu(token, servingsNr){
      return recipeApiClient.get('/weekMenu/'+servingsNr, addHeader(token))
    },
    getNewRecipe(token, recipes, servingsNr){
        return recipeApiClient.post('/newRecipe/'+servingsNr, recipes, addHeader(token))
      },
    getRecipe(token){
        return recipeApiClient.get('/asdasd', addHeader(token))
      },
    addToShoppingList(token,menuRecipes){
      return shoppingListApiClient.post('/addAllFromMenu', menuRecipes, addHeader(token))
    }
}