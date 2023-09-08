<template>
  <div class = "app">
    <h1>Accedi</h1>
    <div class="input-container">
      <div class="email-g">
        <input type="email" id="myEmail" placeholder="e-mail" class="email" v-model="email_accesso">
      </div>
      <div class="password-g">
        <input type="password" id="myPassword" placeHolder="Password" class="password" v-model="password_accesso">
      </div>
      <div>
        <router-link to="/catalogo">
        <input type="submit" id="theButton" value="Accedi" class="button">
      </router-link>
      </div>
      <div class="iscrizione">
        <p>Non sei ancora membro NP? <br> 
          <router-link to="/registrazione"><button @click = " ">Clicca qui e registrati!</button></router-link></p>
      </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      email_accesso: '',
      password_accesso: '',
    }
  },
  methods: {
  }
}
</script>


<style scoped>
.app{
  display: inline-block;
}

body {
  background-image: url('https://image.freepik.com/foto-gratis/bodegon-asientos-cine_23-2148202048.jpg');
  /*https://cdn.create.vista.com/api/media/small/534234542/stock-photo-concert-hall-cinema-hall-with*/
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  text-align: left;
  color: red;
  font-size: 300%;
  font-weight: bold;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.input-container {
  margin-top: 10%;
}

.email-g {
  padding-bottom: 10%;
}

.password {
  font-size: 125%;
  padding-top: 2%;
  padding-left: 2%;
}

.email {
  font-size: 125%;
}

.button {
  margin-top: 10%;
  font-size: 125%;
}

.iscrizione {
  margin-top: 5%;
  font-size: 95%;
  text-align: right;
  color: chartreuse;
}

::-webkit-input-placeholder { color: gray; font-style:italic; font-size: 110%;}
::-moz-input-placeholder { color: gray; font-style:italic; font-size: 110%;}
::-ms-input-placeholder { color: gray; font-style:italic; font-size: 110%;}
</style>