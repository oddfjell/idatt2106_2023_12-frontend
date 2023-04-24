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
  getProducts(token){
    return groceryApiClient.get("/", addHeader(token))
  }
}