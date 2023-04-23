<template>
    <div class="container" >
        <div id="grocery-left">
            <img class="thumbnail" src="@/images/weeklyMenuPage.png" alt="">
            <h3 id="title">{{grocery.name}}</h3>
            <p id="count">Antall: {{count}}</p>
        </div>
        <div id="grocery-right">
        <p id="category">{{grocery.category.name}}</p>

        <div class="buttonBar">
            <button >Spist</button>
            <Throw/>
        </div>
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
    margin: 0;
    width: 50px;
}
#title{
    font-weight: bold;
    width: fit-content;
}
.container{
    padding: 0 1%;
    margin: 2% auto;
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: space-between;

}
#grocery-left{
    margin-left: 0;
}
#grocery-right{
    margin-right: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.buttonBar{
    margin-right: 0;
    width: fit-content;
    align-self: end;
}
#category{
    text-align: end;
}
</style>