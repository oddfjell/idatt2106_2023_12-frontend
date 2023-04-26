import {createPinia} from "pinia";
import {mount} from "@vue/test-utils"
import {describe,expect,it,vi} from "vitest";
import FrontView from '@/views/FrontView.vue'
import router from '@/router'

const pinia = createPinia();
function mountFrontView(){
    return mount(FrontView,{
        global:{
            plugins:[router,pinia]
        },
        computed:{
            username(){return "bop"}
    }
    })
}
describe('Frontview',()=>{
    it('mounts properly',()=>{
        const wrapper = mountFrontView()
        expect(wrapper.text()).toContain('Kjøleskap','Ukemeny','Handleliste')
    })
})
describe('The router routes to', ()=>{
    it('Refrigerator'), async ()=>{
        const push = vi.spyOn(router,'push')
        await mountFrontView().find('a[href = "/refrigerator"]').trigger('click')
        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/refrigerator')
    }
    }
)
describe('The router routes to', ()=>{
        it('WeeklyMenu'), async ()=>{
            const push = vi.spyOn(router,'push')
            await mountFrontView().find('a[href = "/weeklyMenu"]').trigger('click')
            expect(push).toHaveBeenCalledTimes(1)
            expect(push).toHaveBeenCalledWith('/weeklyMenu')
        }
    }
)
describe('The router routes to', ()=>{
        it('ShoppingList'), async ()=>{
            const push = vi.spyOn(router,'push')
            await mountFrontView().find('a[href = "/shoppingList"]').trigger('click')
            expect(push).toHaveBeenCalledTimes(1)
            expect(push).toHaveBeenCalledWith('/shoppingList')
        }
    }
)