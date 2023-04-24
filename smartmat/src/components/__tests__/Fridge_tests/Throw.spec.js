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
        const button = mountThrow().find(".throwModalBtn")
        await button.trigger("click")
    })


    it(" is rendering value correctly",async () => {
    } )
});

describe("ThrowComponent", () => {
    it("mounts properly", () => {
        const wrapper = mountThrow();
        expect(wrapper.text()).toContain("Kastet");
        expect(wrapper.find("#throwModalBtn").exists()).toBe(true);
    });

    it("renders modal when clicked", async () => {
        /*const wrapper = mountThrow();
        const button = wrapper.find("#throwModalBtn");
        expect(wrapper.find("#throwModal").exists()).toBe(false);
        await button.trigger("click");
        expect(wrapper.find("#throwModal").exists()).toBe(true);
        */
        const button = mountThrow().find("#throwModalBtn")
        await button.trigger("click")
        expect(document.querySelector("#throwModal")).toBeTruthy()

    });

    /*
       it(" is rendering value correctly", async () => {
           const wrapper = mountThrow();

           const button = wrapper.find("#throwModalBtn")
           await button.trigger("click")


           const slider = wrapper.find("#throwSlider");
           expect(slider.exists()).toBeTruthy();
           await slider.setValue(50);
           expect(wrapper.vm.value).toBe(50);
       })

       it("renders the slider correctly", async () => {
           const wrapper = mountThrow();
           const button = wrapper.find("#throwModalBtn"); // find the button in the wrapper object
           await button.trigger("click"); // click the button to open the modal

           const slider = wrapper.find("#throwSlider");
           expect(slider.exists()).toBeTruthy(); // check that the slider exists
           await slider.setValue(;
           expect(wrapper.vm.value).toBe(50);
       });




       /*
       it("is rendering value correctly", async () => {
           const wrapper = mountThrow();
           await new Promise((resolve) => setTimeout(resolve, 100)); // add a delay
           const slider = wrapper.find("#throwSlider");
           expect(slider.exists()).toBe(true);
           await slider.setValue(50);
           expect(wrapper.vm.value).toBe(50);
       });

       it(" is rendering value correctly", async () => {
           const wrapper = mountThrow();
           const slider = wrapper.find("#throwSlider");
           expect(slider.exists()).toBe(true);
           await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay
           await slider.setValue(50);
           expect(wrapper.vm.value).toBe(50);
       });

       it(" is rendering value correctly", async () => {
           const wrapper = mountThrow();
           const slider = wrapper.find("#throwSlider");
           expect(slider.exists()).toBe(true);
           await slider.setValue(50);
           expect(wrapper.vm.value).toBe(50);
       })

       it("is rendering value correctly", async () => {
           const wrapper = mountThrow();
           const button = wrapper.find("#throwModalBtn");
           await button.trigger("click");
           const slider = wrapper.find("#throwSlider");
           await slider.setValue(50);
           expect(wrapper.find("p").text()).toContain("50% igjen");
       });*/
});