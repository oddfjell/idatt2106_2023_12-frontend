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
    getWeekMenu(token){
      return recipeApiClient.get('/weekMenu', addHeader(token))
    },
    getNewRecipe(token, recipes){
        return recipeApiClient.post('/newRecipe', recipes, addHeader(token))
      },
    getRecipe(token){
        return recipeApiClient.get('/asdasd', addHeader(token))
      },
    addToShoppingList(token,menuRecipes){
      return shoppingListApiClient.post('/addAllFromMenu', menuRecipes, addHeader(token))
    }
}