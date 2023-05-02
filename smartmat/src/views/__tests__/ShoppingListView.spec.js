import {mount} from "@vue/test-utils";
import RefrigeratorView from "@/views/RefrigeratorView.vue";
import ShoppingListGrid from "@/components/ShoppingList/ShoppingListGrid.vue";
import router from "@/router";
import {describe,it, expect} from "vitest";
import {createPinia} from "pinia";

const pinia = createPinia()


       // expect(wrapper.findComponent(GroceryGrid).exists()).toBe(true)

function mountShoppingListView() {
    return mount(RefrigeratorView, {
        global: {
            plugins: [router, pinia]
        },
        computed:{
            username(){return "bop"}
        }
    })
}
describe("ShoppingListView", () => {
    it("render ShoppingListGrid correct",async () => {
        expect(mountShoppingListView().findComponent(ShoppingListGrid).exists()).toBe(true)
    })
});
