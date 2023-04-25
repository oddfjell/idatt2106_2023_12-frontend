import { beforeEach, describe, it, expect, vi} from "vitest";
import groceryService from "@/services/groceryService";
import axios from "axios";

vi.mock('axios')
describe("Grocery Service", () =>{
    beforeEach(() => {
        axios.get.mockReset()
        axios.post.mockReset()
    })

    describe("getProducts test", async () => {
        it("tests that axios.get method is called while calling getGroceries method", async () => {
            const groceriesMock = [{id:1},{id:2}]
            axios.get.mockResolvedValue({
                data: groceriesMock,
            })
            const groceries = await groceryService.getProducts(123);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/grocery/', {headers:{"Authorization": "Bearer 123", 'Content-Type': 'application/json'}, withCredentials: true} )
            expect(groceries.data).toStrictEqual(groceriesMock)/**/
        });
    })
})