import { beforeEach, describe, it, expect, vi} from "vitest";
import shoppingListService from "@/services/shoppingListService";
import axios from "axios";

vi.mock('axios')
describe("Shopping List Service", () =>{
    beforeEach(() => {
        axios.get.mockReset()
        axios.post.mockReset()
    })

    describe("getProducts test", async () => {
        it("tests that axios.post method is called while calling getProducts method", async () => {
            expect("elo").toStrictEqual("elo")
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
    /**
    describe("addToShoppingList test", async () => {
        it("tests that axios.post method is called while calling getProducts method", async () => {
            expect("elo").toStrictEqual("elo")
            const productsMock = [{id:1},{id:2}]
            axios.get.mockResolvedValue({
                data: productsMock,
            })
            //TODO get account from token in backend
            const products = await shoppingListService.getProducts(123);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/shoppingList/', {headers:{"Authorization": "Bearer 123", 'Content-Type': 'application/json'}, withCredentials: true} )
            expect(products.data).toStrictEqual(productsMock)
        });
    })


     * getProducts(token){
     *         return axios.get(baseURL+'/', config2(token))//Var add header
     *     },
     *     addToShoppingList(product, token){
     *         return shoppingListApiClient.post('/', product, addHeader(token))
     *     },
     *     removeFromShoppingList(productID, token){
     *         return shoppingListApiClient.delete('/remove/'+productID, addHeader(token))
     *     },
     *     acceptRequest(product, token){
     *         return shoppingListApiClient.put('/accept', product, addHeader(token))
     *     }
     */
})











/**import { beforeEach, describe, it, expect, vi } from "vitest";
import accountService from "@/services/accountService";
import axios from 'axios';

vi.mock('axios')
describe("Account Service", () => {
    beforeEach(() => {
        axios.get.mockReset()
        axios.post.mockReset()
    })
    describe("getAccounts test", ()=>{
        it("tests that you get all accounts ", async ()=>{
            const accountsMock = [{id:1},{id:2}]
            axios.get.mockResolvedValue({
                data: accountsMock,
            })
            const accounts = await accountService.getAllAccounts(123);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/auth/account/',{headers:{"Authorization": "Bearer 123", 'Content-Type': 'application/json'}, withCredentials: true} )
            expect(accounts.data).toStrictEqual(accountsMock)
        })
    })
    describe("registerAccount test", () => {
        it("tests that axios.post method is called while calling registerAccount method", async () => {
            const responseMock = true
            axios.post.mockResolvedValue({
                data: responseMock,
            })
            const newAccountPayload = {
                name: 'bob',
            }
            const logInResult = await accountService.registerAccount(newAccountPayload)
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/auth/account/registerAccount', newAccountPayload)
            expect(logInResult.data).toStrictEqual(responseMock)
        });
    })

    describe("login test", () => {
        it("tests that axios.post method is called while calling the login method", async () => {
            const responseMock = true;
            axios.post.mockResolvedValue({
                data: responseMock,
            });
            const newAccountPayload = {
                username: "test",
                password: "test",
            };
            const logInResult = await accountService.loginAccount(newAccountPayload);//, accountService.config
            expect(axios.post).toHaveBeenCalledWith(
                "http://localhost:8080/auth/account/loginAccount",
                newAccountPayload,
                accountService.config // Pass the config object here
            );
            expect(logInResult.data).toStrictEqual(responseMock);
        });
    });


    describe("removeAccount test", () => {
        it("tests that axios.post method is called while calling removeAccount method", async () => {
            const responseMock = true
            axios.post.mockResolvedValue({
                data: responseMock,
            })
            const AccountPayload = {
                name: 'bob',
            }
            const removeResult = await accountService.removeAccount(AccountPayload, 123)
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/auth/account/remove', AccountPayload, {headers:{"Authorization": "Bearer 123", 'Content-Type': 'application/json'}, withCredentials: true} )
            expect(removeResult.data).toStrictEqual(responseMock)
        });
    })
});

*/