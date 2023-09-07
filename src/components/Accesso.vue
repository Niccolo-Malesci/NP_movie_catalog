<template>
  <div class ="app">
    <h1>Accedi</h1>
    <div class="input-container">
      <div class="ema">
        <input type="email" id="myEmail" placeholder="e-mail" class="em" v-model="e">
      </div>
      <div class="pas">
        <input type="password" id="myPassword" placeHolder="Password" class="pa" v-model="p">
      </div>
      <div>
        <input type="submit" id="theButton" value="Accedi" class="button">
      </div>
      <div class="iscrizione">
        <p>Non sei ancora membro NP? <br> Clicca qui e registrati! </p>
      </div>
  </div>
</div>
</template>


<script>
export default {
    data () {
      return {
        e: '',
        p: '',
      }
    },
    methods: {
        addEmail(indirizzo) {
            this.email = indirizzo;
        },
        addPassword(pass) {
            this.password = pass;
        }
    }
}
</script>


<style>
.app{
  display: inline-block;
}

body {
  background-image: url('https://img.freepik.com/free-photo/still-life-cinema-seats_23-2148202048.jpg?w=1060&t=st=1694090593~exp=1694091193~hmac=c2d1b3e90da58210fd7875615ce85d4bdc45e9d9e5d22d5f5e5187b9d54e57d8');
  /*https://cdn.create.vista.com/api/media/small/534234542/stock-photo-concert-hall-cinema-hall-with*/
  background-repeat: no-repeat;
  background-size: cover;
  margin-left: 15%;
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

.ema {
  padding-bottom: 10%;
}

.pa {
  font-size: 125%;
  padding-top: 2%;
  padding-left: 2%;
}

.em {
  font-size: 125%;
}

.button {
  margin-top: 10%;
  font-size: 125%;
}

.iscrizione {
  margin-top: 5%;
  font-size: 80%;
  text-align: right;
}

::-webkit-input-placeholder { color: gray; font-style:italic; font-size: 110%;}
::-moz-input-placeholder { color: gray; font-style:italic; font-size: 110%;}
::-ms-input-placeholder { color: gray; font-style:italic; font-size: 110%;}
</style>
