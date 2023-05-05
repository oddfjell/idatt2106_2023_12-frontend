import { defineStore } from "pinia";
import {ref} from "vue";

export const shoppingListStore = defineStore("shoppingList",() =>{
    const shoppingList = ref({
        shoppingListEntities:[],
        shoppingListSuggestions:[],
        saved:true
    });

    const getShoppingListEntities = () =>{
        return shoppingList.value.shoppingListEntities
    }

    const getShoppingListSuggestions = ()=>{
        return shoppingList.value.shoppingListSuggestions
    }

    const setShoppingListEntities = (newShoppingListEntities) =>{
        shoppingList.value.shoppingListEntities= newShoppingListEntities
    }

    const setShoppingListSuggestions = (newSuggestions) =>{
        shoppingList.value.shoppingListSuggestions = newSuggestions
    }
    const addShoppingListEntity = (newShoppingListEntity) =>{
        let shoppingListEntity = shoppingList.value.shoppingListEntities.find((shoppingListEntity)=> shoppingListEntity.name===newShoppingListEntity.name)
        if(shoppingListEntity){
            shoppingListEntity.count++
        } else{
            shoppingList.value.shoppingListEntities.push(newShoppingListEntity)
        }
    }

    const updateSuggestion = (newShoppingListEntity) => {
        let shoppingListEntity = shoppingList.value.shoppingListSuggestions.find((shoppingListEntity)=> shoppingListEntity.name===newShoppingListEntity.name)
        if(!shoppingListEntity){
            shoppingList.value.shoppingListSuggestions.push(newShoppingListEntity)
            shoppingListEntity = shoppingList.value.shoppingListSuggestions.find((shoppingListEntity)=> shoppingListEntity.name===newShoppingListEntity.name)
        }
        shoppingListEntity.suggestion = true;
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
        getShoppingListSuggestions,
        setShoppingListEntities,
        setShoppingListSuggestions,
        addShoppingListEntity,
        updateShoppingListEntity,
        getStateSaved,
        setStateSaved,
        shoppingList,
        updateSuggestion
    };
})

