<template>
    <div id="container">
    <input type="checkbox" :checked="listEntity.foundInStore">
        <p>{{ listEntity.name }}</p>
        <p>Antall: {{ listEntity.count }}</p>
    </div>
</template>

<script>
export default {
    name: "shoppingListEntity",
    props:{
        listEntity:Object
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