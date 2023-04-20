import axios from 'axios';

const accountApiClient = axios.create({
  baseURL: 'http://localhost:8080/auth/account',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
function addHeader(token){
  return {
    headers: {
      "Authorization": "Bearer " + token
    },
  }
}

export default {

  //Register an account
  registerAccount(account){

    return accountApiClient.post('/registerAccount', account)
  },

  //Login to an account
  loginAccount(account){
    return accountApiClient.put('/loginAccount', account)
  },

  //Get all accounts
  getAllAccounts(token) {
    return accountApiClient.get('/', addHeader(token));
  },

  //Remove an account
  removeAccount(token){
    return accountApiClient.put('/remove', addHeader(token));
  },

};
