import { beforeEach, describe, it, expect, vi} from "vitest";
import shoppingListService from "@/services/shoppingListService";
import axios from "axios";

vi.mock('axios')
describe("Shopping List Service", () =>{
    beforeEach(() => {
        axios.get.mockReset()
        axios.post.mockReset()
        axios.put.mockReset()
        axios.delete.mockReset()
    })

    describe("getProducts test", async () => {
        it("tests that axios.post method is called while calling getProducts method", async () => {
            const productsMock = [{id:1},{id:2}]
            axios.get.mockResolvedValue({
                data: productsMock,
            })
             //TODO get account from token in backend
            const products = await shoppingListService.getProducts(123);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/shoppingList/', {headers:{"Authorization": "Bearer 123", 'Content-Type': 'application/json'}, withCredentials: true} )
            expect(products.data).toStrictEqual(productsMock)/**/
        });
    })

    describe("addToShoppingList test", () => {
        it("tests that axios.post method is called while calling addToShoppingList method", async () => {
            const status = 202
            axios.post.mockResolvedValue({
                status: 202
            })
            const productPayload = {
                name: 'melk',
            }
            const logInResult = await shoppingListService.addToShoppingList(productPayload, 123)
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/shoppingList/', productPayload, {headers:{"Authorization": "Bearer 123", 'Content-Type': 'application/json'}, withCredentials: true})
            expect(logInResult.status).toStrictEqual(status)
        });
    })

    describe("remove from shoppingList test", () => {
        it("ests that axios.delete method is called while calling removeFromShoppingList method", async () => {
            const status = 202
            axios.delete.mockResolvedValue({
                status: 202
            })
            const productPayload = {
                name: '1234',
            }
            const logInResult = await shoppingListService.removeFromShoppingList(productPayload, 123)
            expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/shoppingList/remove/'+productPayload, {headers:{"Authorization": "Bearer 123", 'Content-Type': 'application/json'}, withCredentials: true})
            expect(logInResult.status).toStrictEqual(status)
        });
    })

    describe("acceptRequest test", () => {
        it("tests that axios.put method is called while calling acceptRequest method", async () => {
            const status = 202
            axios.put.mockResolvedValue({
                status: 202
            })
            const productPayload = {
                name: 'melk',
            }
            const logInResult = await shoppingListService.acceptRequest(productPayload, 123)
            expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/shoppingList/accept', productPayload, {headers:{"Authorization": "Bearer 123", 'Content-Type': 'application/json'}, withCredentials: true})
            expect(logInResult.status).toStrictEqual(status)
        });
    })
})