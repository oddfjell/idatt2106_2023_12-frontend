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
@import "../../assets/style/profile.css";


</style>