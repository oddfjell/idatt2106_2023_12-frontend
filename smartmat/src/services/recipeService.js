import axios from 'axios';

const groceryApiClient = axios.create({
  baseURL: 'http://localhost:8080/recipes',
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
      return groceryApiClient.get('/weekMenu', addHeader(token))
    },
    getNewRecipe(token, recipes){
        return groceryApiClient.post('/newRecipe', recipes, addHeader(token))
      },
    getRecipe(token){
        return groceryApiClient.get('/asdasd', addHeader(token))
      },

}