import {mount} from "@vue/test-utils";
import {describe, expect, it, vi} from "vitest";
import LoginView from "@/views/LoginView.vue";
import router from "@/router";
import {createPinia} from "pinia";
const pinia = createPinia()

function mountLoginView() {
    return mount(LoginView, {
        global: {
            plugins: [router, pinia]
        },

    })
}
describe("LoginView", () => {
    it("mounts properly",async () => {
        expect(mountLoginView().text()).toContain('Login')
    })
    it(" is rendering username and password correctly",async () => {
        const username = mountLoginView().find("input[name=username]");
        const password = mountLoginView().find("input[name=password]");
        await username.setValue("name");
        await password.setValue("password123");
        expect(username.element.value).toBe("name");
        expect(password.element.value).toBe("password123");
    } )
});

describe('The Router', () => {
    it('mounts properly', () => {
        expect(mountLoginView().text()).toContain('Register')
    })

    it('clicks the registerButton', async () => {
        const push = vi.spyOn(router, 'push')

        await mountLoginView().find('button[id=registerBtn]').trigger('click')

        expect(push).toHaveBeenCalledTimes(1)
        expect(push).toHaveBeenCalledWith('/register')
    })
})