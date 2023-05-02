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
            const products = await shoppingListService.getProducts(123);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/shoppingList/', {headers:{"Authorization": "Bearer 123", 'Content-Type': 'application/json'}, withCredentials: true} )
            expect(products.data).toStrictEqual(productsMock)
        });
    })

    describe("saveChanges test", async () => {
        it("tests that axios.put method is called while calling saveChanges method", async () => {
            const shoppingListMock = [{id: 1}, {id: 2}]
            const status = 202
            axios.put.mockResolvedValue({
                status: 202
            })
            const save = await shoppingListService.saveChanges(shoppingListMock, 123);
            expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/shoppingList/save', shoppingListMock, {
                headers: {
                    "Authorization": "Bearer 123",
                    'Content-Type': 'application/json'
                }, withCredentials: true
            })
            expect(save.status).toStrictEqual(status)
        });
    })
    describe("buyChecked test", async () => {
            it("tests that axios.post method is called while calling buyChecked method", async () => {
                const status = 202
                axios.post.mockResolvedValue({
                    status: 202,
                })
                const response = await shoppingListService.buyChecked(123);
                expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/shoppingList/buy', null, {
                    headers: {
                        "Authorization": "Bearer 123",
                        'Content-Type': 'application/json'
                    }, withCredentials: true
                })
                expect(response.status).toStrictEqual(status)/**/
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
                    expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/shoppingList/accept', productPayload, {
                        headers: {
                            "Authorization": "Bearer 123",
                            'Content-Type': 'application/json'
                        }, withCredentials: true
                    })
                    expect(logInResult.status).toStrictEqual(status)
                });
            })
})