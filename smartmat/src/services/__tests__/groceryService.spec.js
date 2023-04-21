import { beforeEach, describe, it, expect, vi } from "vitest";
import axios from 'axios';
import groceryService from "@/services/groceryService";

vi.mock('axios')
describe("Account Service", () => {
    beforeEach(() => {
        axios.get.mockReset()
        axios.post.mockReset()
    })

    /*
    addProduct(product, token){
      return groceryApiClient.post('/addProduct', product, addHeader(token))
    },
    editProduct(product, token) {
      return groceryApiClient.put('/editProduct', product, addHeader(token))
    },
    removeProduct(productID, token){
      return groceryApiClient.delete('/removeProduct/' + productID, addHeader(token))
    },
    throwProduct(productID, token){
      return groceryApiClient.delete('/throwProduct/'+productID, addHeader(token))
    }
     */
});