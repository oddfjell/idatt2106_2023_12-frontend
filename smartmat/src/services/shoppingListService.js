import axios from 'axios';
const baseURL = 'http://localhost:8080/shoppingList';

function config (token) {
    return {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token

        },
        withCredentials: true
    }
}

export default {
    getProducts(token){
        return axios.get(baseURL+'/', config(token))//Var add header
    },
    saveChanges(shoppingList, token){
        return axios.put(baseURL+'/save', shoppingList, config(token))
    },
    buyChecked(token){
        return axios.post(baseURL+'/buy',null,  config(token))
    },
    acceptRequest(product, token){
        return axios.put(baseURL+'/accept', product, config(token))
    },
    getSuggestions(token){
        return axios.get(baseURL + "/getSuggestions", config(token))
    },
    suggestGrocery(product, token){
        return axios.post(baseURL + "/suggest", product, config(token))
    },
    deleteSuggestion(product, token){
        return axios.post(baseURL + "/delete", product, config(token))
    }


}

