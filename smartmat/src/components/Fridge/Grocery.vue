<template>
    <div class="container">
        <div id="grocery-header">
            <img class="thumbnail" src="@/images/weeklyMenuPage.png" alt="">
            <h3 id="title">{{grocery.name}}</h3>
        </div>
        <p id="category">{{grocery.category.name}}</p>
        <p id="count">Antall: {{count}}</p>
        <div class="buttonBar">
            <button>Spist</button>
            <Throw/>
        </div>
</div>
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
.thumbnail{
    width: 10%;
}
#title{
    font-weight: bold;
}
.container{
    padding: 0 1%;
    margin: 2% auto;
    width: 90%;
    height: 90%;

}
#grocery-header{
float: left;
}
.buttonBar{
    float: right;
}
</style>