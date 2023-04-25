<template>
    <RouterLink to="/refrigerator">
        <div id="border">
        <h1>Kjøleskap</h1>   <img src="../images/refrigerator.png" alt="Kjøleskap" >
        </div>
    </RouterLink>

    <RouterLink to="/weeklyMenu">
      <div id="border">
        <h1>Ukemeny</h1>
        <img id="menu" src="../images/weeklyMenuPage.png" alt="Ukemeny">
      </div>
    </RouterLink>
    
    <RouterLink to="/shoppingList">
      <div id="border">
        <h1>Handleliste</h1>
        <img src="../images/list.png" alt="Handleliste">
      </div>
    </RouterLink>
</template>
<script>
import {tokenStore} from "@/stores/tokenStore";

export default {
    created() {
        console.log(tokenStore().user.username)
        console.log(tokenStore().user.jwt)
    }
}
</script>

<style scoped>
@import '@/assets/style/frontPage.css';
</style>
