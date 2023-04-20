import {mount} from "@vue/test-utils";
import {describe, beforeAll, test} from "vitest";
import Login from "../../views/LoginView.vue";


describe("Login Form", () => {


    let wrapper;

    beforeAll(()=>{
        wrapper = mount(Login)});

    test("Rendering username and password correctly",()=>{

        const userName= wrapper.find("input[name=username]");
        const password = wrapper.find("input[name=password]");
        console.log(userName,password);
    } )
});
