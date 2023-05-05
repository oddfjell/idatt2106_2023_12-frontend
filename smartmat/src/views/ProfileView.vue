<template>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
  <div id="row">
    <div :id='"profile"+index' v-for="(profile, index) in profiles" :key="index">
      <ProfileIcon :profile="profile" @selectProfile="passwordPopup" @deleteProfile="passwordPopupDelete"></ProfileIcon>
    </div>
      <div id="addProfile">
    <ProfileIcon :profile="addProfile" :add="1"></ProfileIcon>
      </div>
  </div>

  <div id="logout">
    <button @click="logout" id="logout" class="logout-Btn">Logg ut
      <span class="material-symbols-outlined">logout</span></button>
  </div>

  <div v-if="popup">
    <PasswordPopup :profile="selectedProfile" :deleteProfile="deleteProfile"
                   @closePopup="closeThePopup"></PasswordPopup>
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

  /**
   * Returns an object containing data properties used in the ProfileView component
   * @return {Object} An object with the following properties:
   *   - profiles: An empty array to store the user's profiles retrieved from the server
   *   - addProfile: An object with a default username to display the "add profile" icon
   *   - popup: A boolean indicating whether the password popup window should be displayed
   *   - selectedProfile: The currently selected profile to edit or delete
   *   - deleteProfile: A boolean indicating whether the selected profile should be deleted or not
   */

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
    /**
     * Displays a password popup for the given profile.
     * @param {Object} profile - The profile object.
     * @returns {void}
     */
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
    /**
     * deletes a user profile and opens the password popup
     * @param {Object} profile - The profile to be deleted
     * @returns {void}
     */
    async passwordPopupDelete(profile) {
        if (profile.password) {
            this.selectedProfile = profile;
            this.deleteProfile = true;
            this.popup = true;
        }else{
            await accountService.deleteProfile(profile, tokenStore().user.jwt)
            location.reload();
        }
    },

    /**
     * Closes the password popup by setting the selectedProfile to null and the popup to false
     */
    closeThePopup() {
      this.selectedProfile = null;
      this.popup = false;
    },
    /**
     * Logs the user out by changing the JWT and username in the tokenStore to empty strings
     * and redirecting to the home page.
     * @throws {Error} If there is an error logging out
     * @returns {void}
     */

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

  /**

   Lifecycle hook called when the component is created
   If no JWT is found in tokenStore, redirect to login page
   Retrieves all profiles for the current user using the user's JWT, and adds them to the component's profile list
   @throws error if the JWT is invalid or if there is a problem retrieving the profile list
   */
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