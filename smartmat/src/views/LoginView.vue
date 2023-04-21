<template>
    <div class="container">
        <h1>Login</h1>
  <form @submit.prevent>
    <label class="loginLabel" for="username">Brukernavn: </label>
    <input type="text" v-model="user.username" placeholder="Skriv ditt brukernavn " name="username" required>

    <label class="loginLabel" for="password">Passord: </label>
    <input type="text" v-model="user.password" placeholder="Skriv ditt passord" name="password" required>

      <p id="error" v-if="error">{{error}} </p>

      <div class="Btn">
          <button id="loginBtn" @click="onSubmit" type="submit">Sign in</button>
      </div>
      <div class="Btn">
          <button id="registerBtn" @click="onRegister" >Dont have an account? Register here!</button>
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
                    let response = await accountService.loginAccount(this.user)
                    if (response.status === 200) {
                        await router.push("/")
                    } else {
                        this.error = response.status
                        console.log("Login failed")
                    }
                }catch (error) {
                    this.error="Could not find this user"
                }
            }
        },
        onRegister(){
            router.push('/register')
        }
    }
}
</script>

<style>

@import "../assets/style/login.css";

#loginBtn{
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    width: 80%;
    color: white;
    border-radius: 5px;
}
#registerBtn{
    background: #b7b7b7;
    border: 0;
    padding: 10px 20px;
    width: 60%;
    color: black;
    border-radius: 5px;
}
#loginBtn:hover{
    background-color: #4169a8;
    cursor: pointer;
}
#registerBtn:hover{
    background-color: #d0cece;
    cursor: pointer;
}

#error{
    color:red
}


</style>
