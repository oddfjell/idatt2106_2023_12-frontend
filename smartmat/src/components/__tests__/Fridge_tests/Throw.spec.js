import {describe, expect, it} from "vitest";
import {mount} from "@vue/test-utils";
import Throw from "@/components/Fridge/Throw.vue";



function mountThrow() {
    return mount(Throw, {
        showThrowModal:false,
        value:100
    })
}
describe("ThrowComponent", () => {
    it("mounts properly",async () => {
        expect(mountThrow().text()).toContain('Kast')
        expect(mountThrow().find("button"))
    })

    it("renders modal when clicked",async () => {
        const button = mountThrow().find("#throwModalBtn")
        await button.trigger("click")
    })


    it(" is rendering value correctly",async () => {
    } )
});