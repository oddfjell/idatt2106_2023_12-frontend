<template>
    <div class="container">
        <h1>{{grocery.name}}</h1>
        <p>{{grocery.category.name}}</p>
        <p>Antall: {{count}}</p>
        <div class="buttonBar">
            <button >Eat</button>
            <Throw/>
        </div>
    </div>
    <div class=""></div>
</template>

<script>
import Throw from "@/components/Fridge/Throw.vue";

export default {
    name: "GroceryComponent",
    components: {Throw},
    props: {
        grocery:Object,
        count:Number,
    },
    created() {
        console.log(this.grocery)
    },
}
</script>

<style scoped>
.buttonBar{
    float:right;
}
</style>