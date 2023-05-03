import { beforeEach, describe, it, expect, vi } from "vitest";
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
        it("tests that axios.delete method is called while calling removeAccount method", async () => {
            const responseMock = true
            axios.delete.mockResolvedValue({
                data: responseMock,
            })
            const removeResult = await accountService.removeAccount( 123)
            expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/auth/account/remove', {headers:{"Authorization": "Bearer 123", 'Content-Type': 'application/json'}, withCredentials: true} )
            expect(removeResult.data).toStrictEqual(responseMock)
        });
    })
});