import { beforeEach, describe, it, expect} from "vitest";
import { setActivePinia, createPinia } from 'pinia'
import { tokenStore } from '@/stores/tokenStore'

describe('tokenStore', () => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('updates username', () => {
        const store = tokenStore()
        expect(store.user.username).toBe("")
        store.changeUsername("testUsername")
        expect(store.user.username).toBe("testUsername")
    })

    it('updates token', () => {
        const store = tokenStore()
        expect(store.user.jwt).toBe("")
        store.changeJWT("testToken")
        expect(store.user.jwt).toBe("testToken")
    })
})