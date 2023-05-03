<template>
  <div id="row">
    <div v-for="(profile, index) in profiles" :key="index" >
      <ProfileIcon :profile="profile" @selectProfile="passwordPopup"></ProfileIcon>
    </div>
    <ProfileIcon :profile="addProfile" :add="1"></ProfileIcon>
  </div>

  <div v-if="popup">
    <PasswordPopup :profile="selectedProfile" @closePopup="closeThePopup"></PasswordPopup>
  </div>

</template>

<script>
import {tokenStore} from "@/stores/tokenStore";
import accountService from "../services/accountService";
import ProfileIcon from "../components/Common/ProfileIcon.vue";
import PasswordPopup from "../components/Common/PasswordPopup.vue";

export default {
  name: "ProfileView",
  components: {PasswordPopup, ProfileIcon},
  data() {
    return {
      profiles: [],
      addProfile: {
        username: "Add"
      },
      popup: false,
      selectedProfile: null
    }
  },

  methods:{
    passwordPopup(profile){
      this.selectedProfile = profile;
      this.popup = true;
    },
    closeThePopup(){
      this.selectedProfile = null;
      this.popup = false;
    }

  },

  async created() {
    let profileList = await accountService.getAllProfiles(tokenStore().user.jwt);
    let profileListData = profileList.data;

    for (let profile of profileListData) {
      this.profiles.push(profile);
    }
  }


}


</script>

<style scoped>

@media (min-width: 501px ) {
  #row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
    height: auto;
    gap: 3%;
    margin: 5% auto auto;
  }
}

@media (max-width: 500px) {
  #row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
    height: auto;
    gap: 3%;
    margin: 5% auto auto;
    font-size: 10px;
  }
}


</style>