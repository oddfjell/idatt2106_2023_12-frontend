import {defineStore} from "pinia";
import {ref, watch} from "vue";


export const tokenStore = defineStore("user", () => {
    const user = ref({
        username: "",
        jwt: "",
        restricted: null
    });

// Check if there is a user object in local storage and initialize user.value with it
    if (localStorage.getItem("user")) {
        user.value = JSON.parse(localStorage.getItem("user"))
    }

// Watch for changes to the user object and update the local storage accordingly
    watch(
        user,
        (userVal) => {
            localStorage.setItem("user", JSON.stringify(userVal));
        },
        {deep: true}
    );
    /**

     Update the username of the user object.
     @param {string} updateUsername - The new username to update to.
     */
    const changeUsername = (updateUsername) => {
        user.value.username = updateUsername;
    }
    /**

     Update the JWT of the user object.
     @param {string} updateJWT - The new JWT to update to.
     */
    const changeJWT = (updateJWT) => {
        user.value.jwt = updateJWT;
    }
    /**

     Update the restriction of the user object.
     @param {boolean} updateRestriction - The new restriction value to update to.
     */
    const changeRestriction = (updateRestriction) => {
        user.value.restricted = updateRestriction;
    }

    return {
        user,
        changeUsername,
        changeJWT,
        changeRestriction
    };

});

