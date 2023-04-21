import { beforeEach, describe, it, expect, vi } from "vitest";
import accountService from "@/services/accountService";
import axios from 'axios';

vi.mock('axios')
describe("Account Service", () => {
    beforeEach(() => {
        axios.get.mockReset()
        axios.post.mockReset()
    })
    describe("getAccounts", ()=>{
        it("tests that you get all accounts ", async ()=>{
        const accountsMock = [{id:1},{id:2}]
        axios.post.mockResolvedValue({
            data: accountsMock,
        })
        const accounts = await accountService.getAllAccounts();
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/auth/account/getAllAccounts')
            expect(accounts).toStrictEqual(accountsMock)
        })
    })
    describe("register user", ()=>{
        it("tests that axios.post method is called while calling registerAccount method", async () => {
            const responseMock = true
            axios.post.mockResolvedValue({
                data: responseMock,
            })
            const logInResult = await accountService.registerAccount("bob")
            console.log(responseMock)
            console.log(logInResult)
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/auth/account/registerAccount')
            expect(logInResult.data).toStrictEqual(responseMock)
        });
    })

});
