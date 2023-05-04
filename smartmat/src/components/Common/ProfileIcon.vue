<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div id="profile-card" @click="selectProfile">
    <div v-if="!add" class="material-symbols-outlined" id="icon">person</div>
    <div v-else class="material-symbols-outlined" id="icon">add</div>
    <div id="title">{{profile.username}}</div>
  </div>
</template>

<script>
import router from "../../router";

export default {
  name: "ProfileIcon",
  props:{
    profile:Object,
    add:null
  },
  data(){
    return {
      password:""
    }
  },
  emits:{
    selectProfile(profile){
    }
  },

  methods:{
    async selectProfile() {
      if(this.profile.username === "Add"){
        await router.push("/registerProfile")
      }else{
        this.$emit("selectProfile", this.profile);
      }
    }
  }
}
</script>

<style scoped>


@import "../../assets/style/passwordPopup.css";
</style>