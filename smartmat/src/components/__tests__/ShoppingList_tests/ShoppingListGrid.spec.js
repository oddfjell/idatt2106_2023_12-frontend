import {mount} from "@vue/test-utils";
import {describe, expect, it, vi,} from "vitest";
import router from "@/router";
import ShoppingListGrid from "@/components/ShoppingList/shoppingListGrid.vue";
import {createPinia} from "pinia";

const pinia = createPinia()
function mountShoppingListView() {
    return mount(ShoppingListGrid, {
        global: {
            plugins: [router, pinia]
        },
        computed:{
            username(){return "bop"}
        }
    });
}

describe('ShoppingListGrid',()=>{
    it('mounts properly',()=>{
        const wrapper = mountShoppingListView()
        expect(wrapper.exists()).toBe(true)
    });
})