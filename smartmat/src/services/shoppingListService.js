import axios from 'axios';
const baseURL = 'http://localhost:8080/shoppingList';

const shoppingListApiClient = axios.create({
    baseURL: 'http://localhost:8080/shoppingList',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});
function addHeader(token) {
    return {
        headers: {
            "Authorization": "Bearer " + token
        },
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
    getProducts(token){
        return axios.get(baseURL+'/', config2(token))//Var add header
    },
    addToShoppingList(product, token){
        return axios.post(baseURL+'/', product, config2(token))
    },
    removeFromShoppingList(productID, token){
        return axios.delete(baseURL+'/remove/'+productID, config2(token))
    },
    acceptRequest(product, token){
        return axios.put(baseURL+'/accept', product, config2(token))
    }
}

