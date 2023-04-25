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
        return axios.post(baseURL+'/', product, config(token))
    },
    removeFromShoppingList(productID, token){
        return axios.delete(baseURL+'/remove/'+productID, config(token))
    },
    acceptRequest(product, token){
        return axios.put(baseURL+'/accept', product, config(token))
    }
}

