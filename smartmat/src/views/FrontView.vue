<template>



  <fa icon="user" class="fa-icon" />

  <div id="border">
    <nav>
      <RouterLink to="/Refrigerator">  <h1>Kjøleskap</h1>     <img src="../images/refrigerator.png" alt="Kjøleskap">
    </RouterLink>

    </nav>



  </div>

  <div id="border">

    <nav>

    <RouterLink to="/WeeklyMenuView">  <h1>Ukemeny</h1>  <img id="menu" src="../images/weeklyMenuPage.png" alt="Ukemeny">
    </RouterLink>
    </nav>


  </div>

  <div id="border">
    <nav>
      <RouterLink to="/ShoppingList">  <h1>Handleliste</h1> <img src="../images/list.png" alt="Handleliste">
      </RouterLink>

    </nav>



  </div>




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
