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

#profile-card{
  position: relative;
  margin: 20px;
  width: 200px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: transform 0.3s;
  cursor: pointer;
}

#icon{
  top: 3vh;
  width: 100%;
  height: 100%;
  object-fit: cover;
  font-size: 12rem;
  position: relative;
}

#profile-card #title{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}

#profile-card:hover {
  transform: scale(1.1);
  z-index: 1;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

 .material-symbols-outlined {
   font-variation-settings:
       'FILL' 1,
       'wght' 700,
       'GRAD' 200,
       'opsz' 48
 }

</style>