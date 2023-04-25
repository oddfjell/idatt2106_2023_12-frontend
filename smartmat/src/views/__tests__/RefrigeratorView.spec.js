import {mount} from "@vue/test-utils";
import RefrigeratorView from "@/views/RefrigeratorView.vue";;
import GroceryGrid from "@/components/Fridge/GroceryGrid.vue";
import router from "@/router";
import {describe,it, expect} from "vitest";
import {createPinia} from "pinia";

const pinia = createPinia()


       // expect(wrapper.findComponent(GroceryGrid).exists()).toBe(true)

function mountRefrigeratorView() {
    return mount(RefrigeratorView, {
        global: {
            plugins: [router, pinia]
        }
    })
}
describe("RefrigeratorView", () => {
    it("render GroceryGrid correct",async () => {
        expect(mountRefrigeratorView().findComponent(GroceryGrid).exists()).toBe(true)
    })

});