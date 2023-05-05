import axios from 'axios';

let baseURL = 'http://localhost:8080/grocery'
function configToken (token) {
  return {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + token

    },
    withCredentials: true
  }
}
  export default{
    /**
     * Retrieves all products from the server using a token for authentication.
     * @param {string} token - The token for authentication.
     * @returns {Promise} - A promise that resolves to the response from the server containing all the products.
     */
  getProducts(token){
    return axios.get(baseURL+"/", configToken(token))
  }
}