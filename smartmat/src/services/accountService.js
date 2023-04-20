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
  registerAccount(account, token){

    return accountApiClient.post('/registerAccount', account, addHeader(token))
  },

  //Login to an account
  loginAccount(account, token){
    return accountApiClient.put('/loginAccount', account, addHeader(token))
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
