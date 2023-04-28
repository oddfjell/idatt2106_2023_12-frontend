import { defineStore } from "pinia";
import {ref} from "vue";

export const shoppingListStore = defineStore("shoppingList",() =>{
    const shoppingList = ref({
        shoppingListEntities:[],
    });

    const getShoppingListEntities = () =>{
        return shoppingList.value.shoppingListEntities
    }

    const setShoppingListEntities = (newShoppingListEntities) =>{
        shoppingList.value.shoppingListEntities= newShoppingListEntities
    }
    const addShoppingListEntity = (newShoppingListEntity) =>{
        let shoppingListEntity = shoppingList.value.shoppingListEntities.find((shoppingListEntity)=> shoppingListEntity.name===newShoppingListEntity.name)
        if(shoppingListEntity){
            shoppingListEntity.count++
        } else{
            shoppingList.value.shoppingListEntities.push(newShoppingListEntity)
        }
    }

    const updateShoppingListEntity = (updatedEntity) =>{
        let shoppingListEntity = shoppingList.value.shoppingListEntities.find((shoppingListEntity)=> shoppingListEntity.name===updatedEntity.name)
        if(shoppingListEntity){
            shoppingListEntity = updatedEntity
            return true;
        } else return false

    }

    return{
        getShoppingListEntities,
        setShoppingListEntities,
        addShoppingListEntity,
        updateShoppingListEntity,
    };
})

