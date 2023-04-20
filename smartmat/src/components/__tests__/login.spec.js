import {mount} from "@vue/test-utils";
import {describe, beforeAll, test, expect} from "vitest";
import Login from "../../views/LoginView.vue";


describe("Login Form", () => {


    let wrapper;

    beforeAll(()=>{
        wrapper = mount(Login)});

    test("Rendering username and password correctly",async () => {

        const userName = wrapper.find("input[name=username]");
        const password = wrapper.find("input[name=password]");
        await userName.setValue("name");
        await password.setValue("password123");
        expect(userName.element.value).toBe("name");
        expect(password.element.value).toBe("password123");
        console.log(userName, password);
    } )
});
