<template>
    <div class="container">
        <h1>Logg inn</h1>
  <form @submit.prevent>
    <label class="loginLabel" for="username">Brukernavn: </label>
    <input type="text" v-model="user.username" placeholder="Skriv ditt brukernavn " name="username" required id="username">

    <label class="loginLabel" for="password">Passord: </label>
    <input type="password" v-model="user.password" placeholder="Skriv ditt passord" name="password" required id="password">

      <p id="error" v-if="error">{{error}} </p>

      <div class="Btn">
          <button class="BlueBtn" id="loginBtn" @click="onSubmit" type="submit">Logg inn</button>
      </div>
      <div class="Btn">
          <button class="GreyBtn" id="registerBtn" @click="onRegister" >Har du ikke konto? <br/> Registrer deg her!</button>
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
                    let response = await accountService.loginAccount(this.user)
                    if (response.status === 200) {
                        let data=response.data
                        tokenStore().changeJWT(data.jwt)
                        tokenStore().changeUsername(data.username)
                        await router.push("/home")
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
    },
    created() {
        if(tokenStore().user.username){
            router.push("/home")
        }
    }
}
</script>

<style scoped>

@import "../assets/style/login.css";



</style>
