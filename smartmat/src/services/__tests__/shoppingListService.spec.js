import { beforeEach, describe, it, expect, vi } from "vitest";
import axios from 'axios';
import shoppingListService from "@/services/shoppingListService";

vi.mock('axios')
describe("Account Service", () => {
    beforeEach(() => {
        axios.get.mockReset()
        axios.post.mockReset()
    })

    /*
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
     */
});