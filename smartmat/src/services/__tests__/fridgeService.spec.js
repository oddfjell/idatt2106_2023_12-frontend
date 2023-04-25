import { beforeEach, describe, it, expect, vi} from "vitest";
import fridgeService from "@/services/fridgeService";
import axios from "axios";

vi.mock('axios')
describe("Fridge Service", () =>{
    beforeEach(() => {
        axios.get.mockReset()
        axios.post.mockReset()
    })

    describe("getGroceries test", async () => {
        it("tests that axios.get method is called while calling getGroceries method", async () => {
            const groceriesMock = [{id:1},{id:2}]
            axios.get.mockResolvedValue({
                data: groceriesMock,
            })
            const groceries = await fridgeService.getGroceries(123);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/fridge/groceries', {headers:{"Authorization": "Bearer 123", 'Content-Type': 'application/json'}, withCredentials: true} )
            expect(groceries.data).toStrictEqual(groceriesMock)/**/
        });
    })

    describe("addGrocery test", () => {
        it("tests that axios.post method is called while calling add method", async () => {
            const status = 200
            axios.post.mockResolvedValue({
                status: status
            })
            const productPayload = {
                name: 'melk',
            }
            const melk = await fridgeService.addGrocery(productPayload, 123)
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/fridge/add', productPayload, {headers:{"Authorization": "Bearer 123", 'Content-Type': 'application/json'}, withCredentials: true})
            expect(melk.status).toStrictEqual(status)
        });
    })

    describe("removeGrocery test", () => {
        it("tests that axios.post method is called while calling remove method", async () => {
            const status = 200
            axios.post.mockResolvedValue({
                status: status
            })
            const productPayload = {
                name: 'melk',
            }
            const melk = await fridgeService.removeGrocery(productPayload, 123)
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/fridge/remove', productPayload, {headers:{"Authorization": "Bearer 123", 'Content-Type': 'application/json'}, withCredentials: true})
            expect(melk.status).toStrictEqual(status)
        });
    })

})