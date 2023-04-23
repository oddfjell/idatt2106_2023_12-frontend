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
            <button id="eatBtn" >Spist</button>
            <Throw />
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
    margin: 0;
    width: 100%;
    height: 100%;
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
#throwComponent{
    background: #0b6dff;
    color: white;
}

#eatBtn{
    background: #d5d5d5;
    color: black;
    margin-right: 10px;
}

#throwComponent:hover {
    background-color: #4169a8;
    cursor: pointer;
}

#eatBtn:hover {
    background-color: #b7b7b7;
    cursor: pointer;
}
</style>