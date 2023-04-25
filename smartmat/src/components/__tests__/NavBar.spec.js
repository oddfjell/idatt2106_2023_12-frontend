import {mount} from "@vue/test-utils";
import {describe, expect, it, vi,} from "vitest";
import router from "@/router";
import NavBar from "@/components/NavBar.vue";


function mountNavbarView() {
    return mount(NavBar, {
        global: {
            plugins: [router]
        }
    });
}

describe('NavBar',()=>{
    it('mounts properly',()=>{
        const wrapper = mountNavbarView()
        expect(wrapper.exists()).toBe(true)
    });
})
describe('The router routes to', ()=>{
        it('Refrigerator'), async ()=>{
            const push = vi.spyOn(router,'push')
            await mountNavbarView().find('a[href = "/refrigerator"]').trigger('click')
            expect(push).toHaveBeenCalledTimes(1)
            expect(push).toHaveBeenCalledWith('/refrigerator')
        }
    }
)
describe('The router routes to', ()=>{
        it('WeeklyMenu'), async ()=>{
            const push = vi.spyOn(router,'push')
            await mountNavbarView().find('a[href = "/weeklyMenu"]').trigger('click')
            expect(push).toHaveBeenCalledTimes(1)
            expect(push).toHaveBeenCalledWith('/weeklyMenu')
        }
    }
)
describe('The router routes to', ()=>{
    it('ShoppingList'), async ()=>{
        const push = vi.spyOn(router,'push')
        await mountNavbarView().find('a[href = "/shoppingList"]').trigger('click')
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/shoppingList')
    }

});