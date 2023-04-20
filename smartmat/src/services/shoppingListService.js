import axios from 'axios';

const shoppingListApiClient = axios.create({
    baseURL: 'http://localhost:8080/grocery',
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

export default {
    getProducts(token){
        return shoppingListApiClient.get('/', addHeader(token))
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

