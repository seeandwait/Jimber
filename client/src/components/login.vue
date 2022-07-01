<template>
  <div class="row" >
    <h2 style="font-size:2rem;">Login</h2>
                <form id="login">
                <label for="username">username</label>
                <input type="text" name="username" id="username" v-model="username" >
                <label for="password">password</label>
                <input type="password" name="password" id="password" v-model="password">
                <a v-on:click="login" >login</a>
                </form>
            </div>


</template>

<script>
import axios from "axios"
export default {
  name: 'ChatScreen',
  data(){ return {
     title: 'Login-page',
     username: "",
     password: "",
     token: undefined
     
    }},
    methods: {
     async login(){
        try{
    const response = await axios.post(
          `http://167.172.34.174:3000/api/auth/login`,
          {"username": this.username, "password": this.password},
           {
    headers: {
        'Content-Type': 'application/json'
    }
     });
     this.token = response.data.access_token;
     if(response.data.access_token !== undefined){
      alert("logged in succesfully");
     }
     localStorage.setItem("Token",this.token);
     } catch(error) {
        console.log(error);
     }
     

   }},
    created() {
    this.token = localStorage.getItem("Token");
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#messages{
    height:300px;
    overflow-y: scroll;
   }
   
   #app {
    margin-top: 2rem;
   }
</style>
