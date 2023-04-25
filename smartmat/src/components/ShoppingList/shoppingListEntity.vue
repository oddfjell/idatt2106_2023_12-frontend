<template>
    <div id="container">
    <input type="checkbox" :checked="listEntity.foundInStore">
        <p>{{ listEntity.name }}</p>
        <p>{{listEntity.count}}</p>
       <!--<VueNumberInput :model-value="listEntity.count" @update:model-value="updateValue" /> //TODO -->
    </div>
</template>

<script>
import VueNumberInput from "@/components/Common/NumberInput.vue";

export default {
    name: "shoppingListEntity",
    components: {VueNumberInput},
    props:{
        listEntity:Object
    },
    methods:{
        updateValue(){
            try{
                console.log("update value work in progess")
            }catch (error){
                console.log(error)
            }
        }
    },
    created() {
        console.log(this.listEntity)
    }
}
</script>

<style scoped>
#container{
    display: flex;
    justify-content: space-between;
}

</style>