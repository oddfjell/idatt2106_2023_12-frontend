import {mount} from "@vue/test-utils";
import RefrigeratorView from "@/views/RefrigeratorView.vue";;
import GroceryGrid from "@/components/Fridge/GroceryGrid.vue";
import router from "@/router";
import {describe,it, expect} from "vitest";


       // expect(wrapper.findComponent(GroceryGrid).exists()).toBe(true)

function mountRefrigeratorView() {
    return mount(RefrigeratorView, {
        global: {
            plugins: [router]
        }
    })
}
describe("RefrigeratorView", () => {
    it("render GroceryGrid correct",async () => {
        expect(mountRefrigeratorView().findComponent(GroceryGrid).exists()).toBe(true)
    })

});