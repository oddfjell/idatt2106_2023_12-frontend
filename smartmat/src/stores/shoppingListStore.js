import { defineStore } from "pinia";
import {ref} from "vue";

export const shoppingListStore = defineStore("shoppingList",() =>{
    const shoppingList = ref({
        shoppingListEntities:[],
        changes: [],
    });

    const getShoppingListEntities = () =>{
        return shoppingList.value.shoppingListEntities
    }

    const setShoppingListEntities = (newShoppingListEntities) =>{
        shoppingList.value.shoppingListEntities= newShoppingListEntities
    }

    const getChanges = () =>{
        return shoppingList.value.changes
    }

    const addChange = (change) =>{
        for(const entity of shoppingList.value.changes){
            if(entity.name === change.name){
                shoppingList.value.changes.splice(shoppingList.value.changes.indexOf(entity),1)
            }
        }
        shoppingList.value.changes.push(change)
    }
    const removeChanges = () =>{
        shoppingList.value.changes=[]
    }

    return{
        getShoppingListEntities,
        setShoppingListEntities,
        getChanges,
        addChange,
        removeChanges,
    };
})

