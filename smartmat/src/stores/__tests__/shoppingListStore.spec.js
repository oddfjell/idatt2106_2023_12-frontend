import { beforeEach, describe, it, expect} from "vitest";
import { setActivePinia, createPinia } from 'pinia'
import { shoppingListStore } from '@/stores/shoppingListStore'
import { createApp } from "vue";
import { ref } from "vue";

describe('shoppingListStore', () => {
    const app = createApp({})
    beforeEach(() => {
        const pinia = createPinia().use(ref)
        app.use(pinia)
        setActivePinia(pinia)
    })

    it('updates changes to store', () => {
        const store = shoppingListStore()
        const shoppingListEntities = [{ "name": "Melk", "count": 1, "foundInStore":true },   
                                        {"name": "Yoghurt", "count": 1, "foundInStore": true }]
        store.setShoppingListEntities(shoppingListEntities)
        expect(store.shoppingList.shoppingListEntities).toStrictEqual(shoppingListEntities)
    })
})