<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div id="profile-row" @click="selectProfile">
    <div v-if="!add" class="material-symbols-outlined" id="icon">person</div>
    <div v-else class="material-symbols-outlined" id="icon">add</div>
    <div>{{profile.username}}</div>
  </div>

</template>

<script>
import {tokenStore} from "../../stores/tokenStore";
import router from "../../router";

export default {
  name: "ProfileIcon",
  props:{
    profile:Object,
    add:null
  },
  methods:{
    async selectProfile() {
      if(this.profile.username === "Add"){
        await router.push("/registerProfile")
      }else{
        tokenStore().changeUsername(this.profile.username);
        tokenStore().changeRestriction(this.profile.restricted);
        await router.push("/home")
      }
    }
  }
}
</script>

<style scoped>

#profile-row{
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  font-size: 7vh;
  transition-duration: 0.5s;
}

#profile-row:hover{
  transition-duration: 0.5s;
  cursor: pointer;
}

#icon{
  background-color: white;
  border: black 1vh solid;
  padding: 2vh;
  border-radius: 50vh;
  width: 3vh;
  font-size: 3vh;
  text-align: center;
}

#profile-row:hover #icon{
  transition-duration: 0.5s;
  background-color: blue;
}

</style>