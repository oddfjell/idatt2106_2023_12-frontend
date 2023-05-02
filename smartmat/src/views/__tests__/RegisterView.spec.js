import {mount} from "@vue/test-utils";
import {describe, expect, it, vi} from "vitest";
import router from "@/router";
import RegisterView from "@/views/RegisterView.vue";
import {createPinia} from "pinia";
const pinia = createPinia()
function mountRegisterView() {
    return mount(RegisterView, {
        global: {
            plugins: [router, pinia]
        },
    })
}
describe("RegisterView", () => {
    it("mounts properly",async () => {
        expect(mountRegisterView().text()).toContain('Registrer')
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
        expect(mountRegisterView().text()).toContain('Logg inn')
    })

    it('clicks the registerButton', async () => {
        const push = vi.spyOn(router, 'push')

        await mountRegisterView().find('button[id=loginBtn]').trigger('click')

        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/')
    })
})