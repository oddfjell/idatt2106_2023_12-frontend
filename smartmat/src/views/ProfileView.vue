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
        username: "Add"
      },
      popup: false,
      selectedProfile: null,
      deleteProfile:false
    }
  },

  methods: {
    passwordPopup(profile) {
      this.selectedProfile = profile;
      this.deleteProfile = false;
      this.popup = true;
    },
    passwordPopupDelete(profile) {
      this.selectedProfile = profile;
      this.deleteProfile = true;
      this.popup = true;
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

#logout{
  width: 50%;
  margin: auto;
  align-items: center;
  text-align: center;
}

.logout-Btn {
  font-family: Hack, monospace;
  background: #6dbd5e;
  color: #2c2c2c;
  cursor: pointer;
  font-size: 1.5em;
  padding: 0.8em;
  border: 0;
  transition: all 0.5s;
  border-radius: 0.4em;
  width: auto;
  position: relative;
  min-width: 5em;
}

.logout-Btn::after {
  font-family: "Material Icons";
  position: absolute;
  left: 70%;
  top: 55%;
  right: 0;
  bottom: 0;
  opacity: 0;
  transform: translate(-50%, -50%);
}

.logout-Btn::after.material-symbols-outlined {
  font-variation-settings: 'FILL' 1,
  'wght' 700,
  'GRAD' 200,
  'opsz' 48

}

.logout-Btn:hover {
  background: black;
  transition: all 0.5s;
  border-radius: 0.5em;
  box-shadow: 0 1em 2em #6dbd5e;
  padding: 0.9em 2em 0.9em 1em;
  color: #ffffff;
}

.logout-Btn:hover::after {
  opacity: 1;
  transition: all 0.5s;
  color: #ffffff;

}

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

  .logout-Btn {
    font-family: Hack, monospace;
    background: #6dbd5e;
    color: #2c2c2c;
    cursor: pointer;
    font-size: 1em;
    padding: 0.8em;
    border: 0;
    transition: all 0.5s;
    border-radius: 0.4em;
    width: auto;
    position: relative;
    min-width: 5em;
  }

}


</style>