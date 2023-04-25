import {describe, expect, it} from "vitest";
import {mount} from "@vue/test-utils";
import router from "@/router";
import {createPinia} from "pinia";
import WeeklyMenuView from "@/views/WeeklyMenuView.vue";
const pinia = createPinia();
function mountWeeklyMenu(){
    return mount(WeeklyMenuView,{
        global:{
            plugins:[router, pinia]
        },
    })
}
describe('WeeklyMenuView',()=>{
    it('mounts properly',()=>{
        const wrapper = mountWeeklyMenu()
        expect(wrapper.text()).toContain('arrow')
    })
})