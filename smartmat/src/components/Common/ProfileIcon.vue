<template>
  <div id="profile-card">
      <div v-if="!add" class="material-symbols-outlined" id="remove" @click="removeProfile">Remove</div>
      <div id="choose" @click="selectProfile">
        <div v-if="!add && profile.restricted" class="material-symbols-outlined" id="icon">person</div>
        <div v-if="!add && !profile.restricted" class="material-symbols-outlined" id="icon">shield_person</div>
        <div v-else class="material-symbols-outlined" id="icon">add</div>
         <div id="title">{{profile.username}}</div>
      </div>
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
      if(this.profile.username === "Legg til profil"){
        await router.push("/registerProfile")
      }else{
        this.$emit("selectProfile", this.profile);
      }
    },
    async removeProfile(){
        this.$emit("deleteProfile", this.profile);
    }
  }
}
</script>

<style scoped>

#profile-card{
  position: relative;
  margin: 2em;
  width: 12em;
  height: 17em;
  background-color: #fff;
  border-radius: 1em;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: transform 0.3s;
}

#icon{
  top: 0.1em;
  width: 100%;
  height: 100%;
  object-fit: cover;
  font-size: 12em;
  position: relative;
}

#profile-card #title{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1em;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 1em;
  font-weight: bold;
  text-shadow: 1em 1em 1em rgba(0, 0, 0, 0.5);
}

#profile-card:hover {
  transform: scale(1.1);
  z-index: 1;
  box-shadow: 0 0 3em rgba(0, 0, 0, 0.5);
}
#remove{
   float: right;
    margin-right: 10%;
}
#remove:hover{
    transform: scale(1.5);
    z-index: 1;
    box-shadow: 0 0 3em rgba(0, 0, 0, 0.5);
    cursor: pointer;
}
#choose{
    cursor: pointer;
}
 .material-symbols-outlined {
   font-variation-settings:
       'FILL' 1,
       'wght' 700,
       'GRAD' 200,
       'opsz' 48
 }

</style>