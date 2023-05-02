<template>
  <div id="row">
    <div v-for="(profile, index) in profiles" :key="index">
      <ProfileIcon :profile="profile"></ProfileIcon>
    </div>
    <ProfileIcon :profile="addProfile" :add="1"></ProfileIcon>
  </div>

  <PasswordPopup></PasswordPopup>

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
      }
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

#row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 25vh;
}

</style>