<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div id="row">
    <div :id='"profile"+index' v-for="(profile, index) in profiles" :key="index">
      <ProfileIcon :profile="profile" @selectProfile="passwordPopup" @deleteProfile="passwordPopupDelete"></ProfileIcon>
    </div>
    <ProfileIcon :profile="addProfile" :add="1"></ProfileIcon>
  </div>

  <div id="logout">
    <button @click="logout" id="logout" class="logout-Btn">Logg ut
      <span class="material-symbols-outlined">logout</span></button>
  </div>

  <div v-if="popup">
    <PasswordPopup :profile="selectedProfile" :deleteProfile="deleteProfile" @closePopup="closeThePopup"></PasswordPopup>
  </div>

</template>

<script>
import {tokenStore} from "@/stores/tokenStore";
import accountService from "../services/accountService";
import ProfileIcon from "../components/Common/ProfileIcon.vue";
import PasswordPopup from "../components/Common/PasswordPopup.vue";
import router from "@/router";

export default {
  name: "ProfileView",
  components: {PasswordPopup, ProfileIcon},
  data() {
    return {
      profiles: [],
      addProfile: {
        username: "Legg til profil"
      },
      popup: false,
      selectedProfile: null,
      deleteProfile:false
    }
  },

  methods: {
    async passwordPopup(profile) {
      if (profile.password) {
        this.selectedProfile = profile;
        this.deleteProfile = false;
        this.popup = true;
      } else {
        tokenStore().changeUsername(profile.username);
        tokenStore().changeRestriction(profile.restricted);
        await router.push("/home")
      }
    },
    async passwordPopupDelete(profile) {
        if (profile.password) {
            this.selectedProfile = profile;
            this.deleteProfile = true;
            this.popup = true;
        }else{
            console.log("YOOOO")
            console.log(profile)
            await accountService.deleteProfile(profile, tokenStore().user.jwt)
            location.reload();
        }
    },
    closeThePopup() {
      this.selectedProfile = null;
      this.popup = false;
    },
    logout() {
      try {
        tokenStore().changeJWT("")
        tokenStore().changeUsername("")
        router.push("/")
      } catch (error) {
        this.error = "Kunne ikke logge ut"
      }
    }

  },

  async created() {
      if (!tokenStore().user.jwt) {
          router.push("/")
      }
    let profileList = await accountService.getAllProfiles(tokenStore().user.jwt);
    let profileListData = profileList.data;

    for (let profile of profileListData) {
      this.profiles.push(profile);
    }
  }


}


</script>

<style scoped>


@import "../assets/style/profile.css";




</style>