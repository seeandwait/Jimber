<template>
<div>
  
  <ChatScreen :class="{ hidden: !authenticated}" id="chat"></ChatScreen>
  <login ></login>
  <AuthRegister></AuthRegister>
</div>
</template>S

<script>
import ChatScreen from './components/ChatScreen.vue'
import login from './components/login.vue'
import AuthRegister from './components/AuthRegister.vue'

export default {
  name: 'App',
  data(){return{
    token: undefined,
    authenticated: false,
  }
  },
  components: {
    ChatScreen,
    login,
    AuthRegister
  }, created(){
    this.token = localStorage.getItem("Token");
    if(this.token !== undefined){
      this.authenticated = true;
    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.hidden{
  display: none;
}
</style>
