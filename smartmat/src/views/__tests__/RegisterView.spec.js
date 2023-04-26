import {mount} from "@vue/test-utils";
import {describe, expect, it, vi} from "vitest";
import router from "@/router";
import RegisterView from "@/views/RegisterView.vue";

function mountRegisterView() {
    return mount(RegisterView, {
        global: {
            plugins: [router]
        },
    })
}
describe("RegisterView", () => {
    it("mounts properly",async () => {
        expect(mountRegisterView().text()).toContain('Register')
    })
    it(" is rendering username and password correctly",async () => {
        const username = mountRegisterView().find("input[name=username]");
        const password = mountRegisterView().find("input[name=password]");
        await username.setValue("name");
        await password.setValue("password123");
        expect(username.element.value).toBe("name");
        expect(password.element.value).toBe("password123");
    } )
});
describe('The Router', () => {
    it('mounts properly', () => {
        expect(mountRegisterView().text()).toContain('Login')
    })

    it('clicks the registerButton', async () => {
        const push = vi.spyOn(router, 'push')

        await mountRegisterView().find('button[id=loginBtn]').trigger('click')

        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/')
    })
})