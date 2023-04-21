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
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/auth/account/')
        expect(accounts.data).toStrictEqual(accountsMock)
        })
    })
    describe("registerAccount test", ()=>{
        it("tests that axios.post method is called while calling registerAccount method", async () => {
            const responseMock = true
            axios.post.mockResolvedValue({
                data: responseMock,
            })
            const newAccountPayload = {
                name: 'bob',
            }
            const logInResult = await accountService.registerAccount(newAccountPayload)
            console.log(responseMock)
            console.log(logInResult.data)
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

});