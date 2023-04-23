import {describe, expect, it} from "vitest";
import {mount} from "@vue/test-utils";
import Grocery from "@/components/Fridge/Grocery.vue";

function mountGrocery() {
    return mount(Grocery, {
        props:{
            grocery:{id:1, name:"Melk", category:{id:1,name:"Melk og melkeprodukter"}},
            count:4
        }
    })
}
describe("GroceryComponent", () => {
    it("renders props correctly",async () => {
        const title = mountGrocery().find("#title")
        const count = mountGrocery().find("#count")
        expect(title.text()).toContain("Melk")
        expect(count.text()).toContain(4)
    })
})