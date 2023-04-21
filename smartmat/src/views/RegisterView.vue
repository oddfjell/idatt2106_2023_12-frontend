<template>
    <div class="container">
        <h1>Register</h1>
        <form @submit.prevent >
            <label class="registerLabel" for="username">Brukernavn: </label>
            <input type="text" v-model="user.username" placeholder="Skriv ditt brukernavn " name="username" required>

            <label class="registerLabel" for="password">Passord: </label>
            <input type="password" v-model="user.password" placeholder="Skriv ditt passord" name="password" required>

            <p id="error" v-if="error">{{error}} </p>

            <div class="Btn">
                <button id="registerBtn" @click="onSubmit" type="submit">Register</button>
            </div>
            <div class="Btn">
                <button id="loginBtn" @click="onLogin" >Have an account? Login here!</button>
            </div>

        </form>

    </div>
</template>
<script>
import accountService from "@/services/accountService";
import router from "@/router";

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
                        await router.push("/login")
                    } else {
                        console.log("Login failed")
                    }
                }catch (error){
                    console.log("Registration failed")
                }
            }
        },
        onLogin(){
            router.push('/')
        }
    }
}
</script>

<style>

@import "../assets/style/register.css";
#registerBtn {
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    width: 80%;
    color: white;
    border-radius: 5px;
}
#loginBtn {
    background: #b7b7b7;
    border: 0;
    padding: 10px 20px;
    width: 60%;
    color: black;
    border-radius: 5px;
}
#registerBtn:hover {
    background-color: #4169a8;
    cursor: pointer;
}
#loginBtn:hover {
    background-color: #d0cece;
    cursor: pointer;
}



</style>

