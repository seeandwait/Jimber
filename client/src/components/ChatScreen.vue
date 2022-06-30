<template>
  <div class="row" >
                <div class="col-md-6 offset-md-3 col-sm-12">
                    <h1 class="text-center">{{ title }}</h1>
                    <br>
                    <div id="status"></div>
                    <div id="chat">
                        <p v-if="token === null" style="color:red;font-size:2rem;">Log in to view and send messages</p>
                        <a v-if="token !== null" v-on:click="logout">LOGOUT</a>
                        <input type="text" v-model="name" id="username" class="form-control" placeholder="Enter name...">
                        <br>
                        <div class="card">
                            <div id="messages" class="card-block">
                                <ul>
                                    <li v-for="message of messages" v-bind:key="message.name">{{ message.name }}: {{ message.text }}</li>
                                </ul>
                            </div>
                        </div>
                        <br>
                        <textarea id="textarea" class="form-control" v-model="text" placeholder="Enter message..."></textarea>
                        <br>
                        <button id="send" class="btn" @click.prevent="sendMessage">Send</button>
                    </div>
                </div>
            </div>
</template>

<script>
import {io} from "socket.io-client"
export default {
  name: 'ChatScreen',
  data(){ return {
     title: 'Jimber Chat-room',
     name: '',
     text: '',
     messages: [],
     socket: null,
     token: null
    }},
    methods: {
     sendMessage() {
      if(this.validateInput()) {
       const message = {
       name: this.name,
       text: this.text
      }
      this.socket.emit('msgToServer', message)
      this.text = ''
     }
    },
    receivedMessage(message) {
     this.messages.push(message)
    },
    validateInput() {
     return this.name.length > 0 && this.text.length > 0
    },
    logout(){
        localStorage.removeItem('Token');
    }
   },
    created() {    
    this.token = localStorage.getItem("Token")
     this.socket = io('http://localhost:3000', {
        query: {
            bearerToken: this.token
        }})
     this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message)
     })
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
