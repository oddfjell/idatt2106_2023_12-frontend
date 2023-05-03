import { defineStore } from "pinia";
import {ref} from "vue";

export const shoppingListStore = defineStore("shoppingList",() =>{
    const shoppingList = ref({
        shoppingListEntities:[],
        saved:true
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

    const getStateSaved= () =>{
        return shoppingList.value.saved
    }
    const setStateSaved = (boolean) =>{
        shoppingList.value.saved = boolean
    }

    return{
        getShoppingListEntities,
        setShoppingListEntities,
        addShoppingListEntity,
        updateShoppingListEntity,
        getStateSaved,
        setStateSaved,
        shoppingList,
    };
})

