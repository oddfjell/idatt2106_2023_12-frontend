import axios from 'axios';
const baseURL = "http://localhost:8080/auth/account"
let config = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}
function addHeader(token) {
  return {
    headers:{
      "Authorization": "Bearer " + token
    }
  }
}
export default {
  //Register an account
  registerAccount(account){
    return axios.post(baseURL + '/registerAccount', account)
  },

  //Login to an account
  loginAccount(account){
    return axios.put(baseURL + '/loginAccount', account, config)
  },

  //Get all accounts
  getAllAccounts(token) {
    return axios.get(baseURL + '/', );
  },

  //Remove an account
  removeAccount(token){
    config.headers+=addHeader(token)
    return axios.put(baseURL + '/remove');
  },

};
