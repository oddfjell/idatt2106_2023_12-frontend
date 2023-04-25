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
  getProducts(token){
    return axios.get(baseURL+"/", configToken(token))
  }
}