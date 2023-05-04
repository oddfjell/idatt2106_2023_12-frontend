import axios from 'axios';
const baseURL = "http://localhost:8080/auth/account"
let config = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}
function configToken (token) {
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
    return axios.get(baseURL + '/', configToken(token));
  },

  //Remove an account
  removeAccount(account, token){
    //config.headers+=addHeader(token)
    return axios.post(baseURL + '/remove', account, configToken(token));
  },

  getAllProfiles(token){
    return axios.get(baseURL + '/profiles', configToken(token))
  },

  registerProfile(profile,token){
    return axios.post(baseURL + '/registerProfile', profile,configToken(token))
  },

  loginProfile(profile, token){
    return axios.post(baseURL + "/profileLogin", profile, configToken(token))
  }
};
