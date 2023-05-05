import { defineStore } from "pinia";
import { ref, watch } from "vue";


export const tokenStore = defineStore("user", () => {
    const user = ref({
        username: "",
        jwt: "",
        restricted: null
    });

    if(localStorage.getItem("user")){
        user.value = JSON.parse(localStorage.getItem("user"))
    }

    watch(
        user,
        (userVal) => {
            localStorage.setItem("user", JSON.stringify(userVal));
        },
        {deep:true}
    );

    const changeUsername = (updateUsername) => {
        user.value.username = updateUsername;
    }

    const changeJWT = (updateJWT) => {
        user.value.jwt = updateJWT;
    }

    const changeRestriction = (updateRestriction) => {
        user.value.restricted = updateRestriction;
    }

    return{
        user,
        changeUsername,
        changeJWT,
        changeRestriction
    };

});

