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
function config2 (token) {
  return {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + token

    },
    withCredentials: true
  }
}
export default {
  //Register an account
  registerAccount(account){
    return axios.post(baseURL + '/registerAccount', account)
  },

  //Login to an account
  loginAccount(account){
    return axios.post(baseURL + '/loginAccount', account, this.config)
  },

  //Get all accounts
  getAllAccounts(token) {
    return axios.get(baseURL + '/', config2(token));
  },

  //Remove an account
  removeAccount(token){
    config.headers+=addHeader(token)
    return axios.delete(baseURL + '/remove');
  },

};
