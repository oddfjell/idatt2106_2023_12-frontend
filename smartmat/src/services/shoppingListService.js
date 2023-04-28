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
    saveChanges(changes, token){
        return axios.post(baseURL+'/save', changes, config(token))
    },
    buyChecked(token){
        return axios.post(baseURL+'/buy',null,  config(token))
    },
    acceptRequest(product, token){
        return axios.put(baseURL+'/accept', product, config(token))
    }
}

