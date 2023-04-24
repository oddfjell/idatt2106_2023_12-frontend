import {mount} from "@vue/test-utils";
import {describe, expect, it, vi} from "vitest";
import FrontView from "@/views/FrontView.vue";
import router from "@/router";

function mountFrontView() {
    return mount(FrontView, {
        global: {
            plugins: [router]
        }
    })
}
describe("Frontview ", () => {
    it("mounts properly",async () => {
        expect(mountFrontView().text()).toContain('Kjøleskap', 'Ukemeny','Handleliste ');

    })

})
describe('The Router routes to ', () => {
    it('Refrigerator', async () => {
        const push = vi.spyOn(router, 'push')

        await mountFrontView().find('a[href="Refrigerator"]').trigger('click')

        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/Refrigerator')
    })
})
describe('The Router routes to ', () => {
    it('WeeklyMenuView', async () => {
        const push = vi.spyOn(router, 'push')

        await mountFrontView().find('a[href="WeeklyMenuView"]').trigger('click')

        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/WeeklyMenyView')
    })
})
describe('The Router routes to ', () => {
    it('ShoppingList', async () => {
        const push = vi.spyOn(router, 'push')

        await mountFrontView().find('a[href="ShoppingList"]').trigger('click')

        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/ShoppingList')
    })
})