<template>
  <div id="profile-card">
    <div v-if="!add" class="material-symbols-outlined" id="remove" @click="removeProfile">close</div>
    <div id="choose" @click="selectProfile">
      <div v-if="!add && profile.restricted" class="material-symbols-outlined" id="icon">supervisor_account</div>
      <div v-if="!add && !profile.restricted" class="material-symbols-outlined" id="icon">person</div>
      <div v-else-if="add" class="material-symbols-outlined" id="icon">add</div>
      <div id="title">{{ profile.username }}</div>
    </div>
  </div>
</template>

<script>
import router from "../../router";

export default {
  name: "ProfileIcon",
  props: {
    profile: Object,
    add: null
  },
  /**

   The data object for the ProfileIcon component.
   @returns {object} An object with the password property, used for deleting profiles.
   */
  data() {
    return {
      password: ""
    }
  },
  /**
   * Emitted when a profile is selected by the user.
   *
   * @event ProfileIcon#selectProfile
   * @property {Object} profile - The profile that was selected.
   */

  emits: {
    selectProfile(profile) {
    }
  },

  methods: {
    /**
     * Async method that selects a profile when the profile icon is clicked.
     * If the profile is 'add', the user is navigated to the register profile page,
     * otherwise, the profile is emitted to the parent component.
     *
     * @async
     * @method selectProfile
     * @emits selectProfile
     * @returns {Promise<void>} - A Promise that resolves after the profile is selected.
     */
    async selectProfile() {
      if (this.profile.username === "Legg til profil") {
        await router.push("/registerProfile")
      } else {
        this.$emit("selectProfile", this.profile);
      }
    },

    /**

     Emits an event to delete the current profile.
     @emits deleteProfile
     */
    async removeProfile() {
      this.$emit("deleteProfile", this.profile);
    }
  }
}
</script>

<style scoped>
@import "../../assets/style/profile.css";


</style>