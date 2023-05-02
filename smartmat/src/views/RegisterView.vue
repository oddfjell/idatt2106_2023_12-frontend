<template>
    <div class="container">
        <h1>Register</h1>
        <form @submit.prevent >
            <!-- Label and input for the username field -->
            <label class="registerLabel" for="username">Brukernavn: </label>
            <input type="text" v-model="user.username" placeholder="Skriv ditt brukernavn " name="username" required>

            <!-- Label and input for the password field -->
            <label class="registerLabel" for="password">Passord: </label>
            <input type="password" v-model="user.password" placeholder="Skriv ditt passord" name="password" required>

            <!-- Text field for displaying error messages -->
            <p id="error" v-if="error">{{error}} </p>

            <!-- Button for registering user  -->
            <div class="Btn">
                <button class="BlueBtn" id="registerBtn" @click="onSubmit" type="submit">Register</button>
            </div>

            <!-- Button for redirecting to login-page -->
            <div class="Btn">
                <button class="GreyBtn" id="loginBtn" @click="onLogin" >Have an account? Login here!</button>
            </div>

        </form>

    </div>
</template>
<script>
import accountService from "@/services/accountService";
import router from "@/router";
import {tokenStore} from "@/stores/tokenStore";

export default {
    /**
     * Register-credentials and errormessage
     * @returns {{error: string, user: {password: string, username: string}}}
     */
    data() {
        return {
            user: {
                password: "",
                username: ""
            },
            error:""
        }
    },
    methods:{
        /**
         * Triggerd when clicking the register-button. Sends a register-request. If it is valid it sends a login-request which sets the token and username as the
         * logged-in user. Redirects to the homepage if successful
         * @returns {Promise<void>}
         */
        async onSubmit(){
            console.log(this.user.username)
            if(this.user.username !== undefined || "" ){
                try {
                    let response = await accountService.registerAccount(this.user)
                    if (response.status === 200) {
                        try {
                            response = await accountService.loginAccount(this.user)
                            if(response.status===200){
                                let data= response.data
                                tokenStore().changeJWT(data.jwt)
                                tokenStore().changeUsername(data.username)
                                await router.push("/home")
                            }
                        }catch (error){
                            await router.push("/")
                        }
                    } else {
                        console.log("Login failed")
                        this.error=response.status
                    }
                }catch (error){
                    console.log("Registration failed")
                    this.error="Registration failed"
                }
            }
        },
        /**
         * Redirects to the login-page
         */
        onLogin(){
            router.push('/')
        }
    },
    /**
     * If user is already logged in, the frontpage will be displayed instead.
     */
    created() {
        if(tokenStore().user.username){
            router.push("/home")
        }
    }
}
</script>

<style scoped>

@import "../assets/style/register.css";
#registerBtn {
    width: 80%;
}
#loginBtn {
    width: 60%;
}
#error{
    color:red
}


</style>

