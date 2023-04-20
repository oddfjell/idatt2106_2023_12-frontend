import axios from 'axios';

const groceryApiClient = axios.create({
  baseURL: 'http://localhost:8080/grocery',
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
    addProduct(product, token){
      return groceryApiClient.post('/addProduct', product, addHeader(token))
    },
    editProduct(product, token) {
      return groceryApiClient.put('/editProduct', product, addHeader(token))
    },
    removeProduct(productID, token){
      return groceryApiClient.delete('/removeProduct/' + productID, addHeader(token))
    },
    throwProduct(productID, token){
      return groceryApiClient.delete('/throwProduct/'+productID, addHeader(token))
    }
}