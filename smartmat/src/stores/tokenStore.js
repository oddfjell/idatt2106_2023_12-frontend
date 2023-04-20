import { defineStore } from "pinia";

export const tokenStore = defineStore("token", {
    state: () => ({
        jwtToken: null,
        username:null,
    }),
    persist: {
        storage: localStorage,
    },

    actions: {
        ///username, token (jwt)
        storeToken(logInDetails) {
            let token = logInDetails.jwt
            let username = logInDetails.username
            if((token !== undefined) && (username !== undefined)){
                this.jwtToken = token
                this.username = username
            } else{
                throw new Error("The username or token is undefined")
            }

        },
        logOut(){
            this.jwtToken=null;
            this.username=null;
        }
    },
});