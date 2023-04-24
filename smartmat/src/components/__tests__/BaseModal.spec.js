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
    it('shows the footer button when show is true', () => {
        const wrapper = mount(BaseModal, {
            props: {
                show: true
            }
        })
        const button = wrapper.find('.modal-default-button')
        expect(button.isVisible()).toBe(true)
    })





})


