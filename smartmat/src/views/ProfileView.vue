<template>
  <div id="profiles">
    <div v-for="(profile, index) in profiles" :key="index">
      <ProfileIcon :profile="profile"></ProfileIcon>
    </div>
  </div>


</template>

<script>
import {tokenStore} from "../stores/tokenStore";
import accountService from "../services/accountService";
import ProfileIcon from "../components/Common/ProfileIcon.vue";

export default {
  name: "ProfileView",
  components: {ProfileIcon},
  data(){
    return {
      profiles:[]
    }
  },
  methods:{

  },

  async created() {
    let profileList = await accountService.getAllProfiles(tokenStore().user.jwt);
    let profileListData = profileList.data;

    for (let profile of profileListData){
      this.profiles.push(profile);
    }

  }



}


</script>

<style scoped>

#profiles{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  height: 70vh;
}

</style>