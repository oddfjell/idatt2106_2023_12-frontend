import { beforeEach, describe, it, expect} from "vitest";
import { setActivePinia, createPinia } from 'pinia'
import { shoppingListStore } from '@/stores/shoppingListStore'

describe('shoppingListStore', () => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('updates changes to store', () => {
        const store = shoppingListStore()
        const shoppingListEntities = [{ "name": "Melk", "count": 1, "foundInStore":true },   
                                        {"name": "Yoghurt", "count": 1, "foundInStore": true }]
        store.setShoppingListEntities(shoppingListEntities)
        expect(store.getShoppingListEntities).toBe(shoppingListEntities)
    })
})