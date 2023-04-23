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
        return shoppingListApiClient.post('/', product, addHeader(token))
    },
    removeFromShoppingList(productID, token){
        return shoppingListApiClient.delete('/remove/'+productID, addHeader(token))
    },
    acceptRequest(product, token){
        return shoppingListApiClient.put('/accept', product, addHeader(token))
    }
}

