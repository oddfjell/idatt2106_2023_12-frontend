<template>
<div v-if="username" id="fridgeContainer" class="container">
    <h1>Kjøleskap</h1>
    <GroceryGrid/>
</div>
    <div v-else class="container"><h1>Please log in</h1></div>
</template>

<script>
import GroceryGrid from "@/components/Fridge/GroceryGrid.vue";
import {tokenStore} from "@/stores/tokenStore";
export default {
  name: "RefrigeratorView",
    components: {GroceryGrid},
    computed:{
    username(){
        return tokenStore().user.username
        }
    }
}
</script>

<style scoped>
.container{
    max-width: none;
    min-height: 90vh;
}
#fridgeContainer{
    margin-left: 10%;
    margin-right: 10%;

}
</style>