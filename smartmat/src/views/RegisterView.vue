<template>
    <div class="container">
        <h1>Registrer</h1>
        <form @submit.prevent >
            <label class="registerLabel" for="username">Brukernavn: </label>
            <input type="text" v-model="user.username" placeholder="Skriv ditt brukernavn " name="username" required id="register-username">

            <label class="registerLabel" for="password">Passord: </label>
            <input type="password" v-model="user.password" placeholder="Skriv ditt passord" name="password" required id="register-password">

            <p id="error" v-if="error">{{error}} </p>

            <div class="Btn">
                <button class="BlueBtn" id="registerBtn" @click="onSubmit" type="submit">Registrer</button>
            </div>
            <div class="Btn">
                <button class="GreyBtn" id="loginBtn" @click="onLogin" >Har du allerede konto? Logg inn her!</button>
            </div>

        </form>

    </div>
</template>
<script>
import accountService from "@/services/accountService";
import router from "@/router";
import {tokenStore} from "@/stores/tokenStore";

export default {
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
        onLogin(){
            router.push('/')
        }
    },
    created() {
        if(tokenStore().user.username){
            router.push("/home")
        }
    }
}
</script>

<style scoped>

@import "../assets/style/register.css";



</style>

