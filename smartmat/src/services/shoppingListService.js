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
    addToShoppingList(product, token){
        return axios.post(baseURL+'/add', product, config(token))
    },
    removeFromShoppingList(productID, token){
        return axios.delete(baseURL+'/remove/'+productID, config(token))
    },
    updateChecked(productname, token){
        return axios.post(baseURL+'/mark', productname, config(token))
    },
    buyChecked(token){
        return axios.post(baseURL+'/buy',null,  config(token))
    },
    acceptRequest(product, token){
        return axios.put(baseURL+'/accept', product, config(token))
    }
}

