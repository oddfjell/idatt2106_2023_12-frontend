import {mount} from "@vue/test-utils";
import {describe, expect, it} from "vitest";
import router from "@/router";
import BaseModal from "@/components/Common/BaseModal.vue";

function mountBaseModal() {
    return mount(BaseModal, {
        global: {
            plugins: [router]
        }
    })
}
describe("BaseModal", () => {
    it("mounts properly",async () => {

        expect(mountBaseModal().exists()).toBe(true)

    });

it('renders the button when show is set to true',()=>{
    const wrapper = mount(BaseModal,{
        props:{
            show :true
        }
    })
    const b = wrapper.find('.modal-default-button')
    expect(b.isVisible()).toBe(true)
})

it("render default header and body"),()=>{
    const wrapper= mount(BaseModal,{
        prop:{
            show: true
        },

    });
    expect(wrapper.find('.modal-header').text().toBe("default header"));
    expect(wrapper.find('.modal-body').text().toBe("default body"));
}




})


