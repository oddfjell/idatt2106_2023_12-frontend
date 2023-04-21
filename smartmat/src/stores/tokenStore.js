import { defineStore } from "pinia";
import { ref, watch } from "vue";


export const tokenStore = defineStore("user", () => {
    const user = ref({
        username: "",
        jwt: ""
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

    const changeUsername = (newUsername) => {
        user.value.username = newUsername;
    }

    const changeJWT = (newJWT) => {
        user.value.jwt = newJWT;
    }

    return{
        user,
        changeUsername,
        changeJWT
    };

});

