<template>
  <div class="row" >
    <h2 style="font-size:2rem;">Register</h2>
                <form id="login">
                <label for="username">username</label>
                <input type="text" name="username" id="username" v-model="username" >
                <label for="password">password</label>
                <input type="password" name="password" id="password" v-model="password">
                <a v-on:click="register" >register</a>
                </form>
            </div>


</template>

<script>
import axios from "axios"
export default {
  name: 'AuthRegister',
  data(){ return {
     title: 'Login-page',
     username: "",
     password: "",
     response: null
     
    }},
    methods: {
     async register(){
        try{
    const response = await axios.post(
          `http://167.172.34.174:3000/api/auth/register`,
          {"username": this.username, "password": this.password},
           {
    headers: {
        'Content-Type': 'application/json'
    }
     })
     this.response = response.data;
     console.log(this.response);
     if(this.response === "true" ||this.response === true){
      alert("user created");
     }
     } catch(error) {
        console.log(error);
     }
     

   }},
    created() {
    
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
