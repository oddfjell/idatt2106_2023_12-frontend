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
    getWeekMenu(token, servingsNr, nDays){
      console.log(servingsNr)
      console.log(nDays)
      return recipeApiClient.get('/weekMenu/'+servingsNr+'/'+nDays, addHeader(token))
    },
    getNewRecipe(token, recipes, servingsNr){
        return recipeApiClient.post('/newRecipe/'+servingsNr, recipes, addHeader(token))
      },
    getRecipe(token){
        return recipeApiClient.get('/asdasd', addHeader(token))
      },
    addToShoppingList(token,menuRecipes){
      return shoppingListApiClient.post('/addAllFromMenu', menuRecipes, addHeader(token))
    },
    saveRecipes(token, recipes){
      console.log(recipes)
      return recipeApiClient.post('/saveRecipes', recipes, addHeader(token))
    },
    getSavedWeekMenu(token){
      return recipeApiClient.get("/getSavedWeekMenu", addHeader(token))
    },
    replaceRecipe(token, recipes){
      return recipeApiClient.post("/replaceRecipe", recipes, addHeader(token))
    }
}