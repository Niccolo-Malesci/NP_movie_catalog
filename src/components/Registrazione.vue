<template>
  <div>
    <h1>Registrati!</h1>
    <h2>Non è mai stato così semplice:</h2>
    <div class="input-container">
      <div class="nom">
        <input type="text" id="myName" placeholder="Nome" class="no">
      </div>
      <div class="cognom">
        <input type="text" id="mySurname" placeholder="Cognome" class="cogno">
      </div>
      <div class="ema">
        <input type="email" id="myEmail" placeholder="e-mail" class="em">
      </div>
      <div class="pass">
        <input type="password" id="myPassword" placeholder="Password" class="pa">
      </div>
      <div class="pas">
        <input type="password" id="myPassword" placeholder="Conferma Password" class="p">
      </div>
      <div class="nascita">
        <p>Inserisci qui la tua data di nascita:</p>
        <input type="date" id="birthday">
      </div>
    </div>
  </div>
</template>


<script>
</script>


<style>
.input-container {
  width: 200%;
  margin-right: 10%;
}

h1, h2 {
  text-align: center;
}

body {
  margin-left: 25%;
}

.nom {
  display: inline-block;
  margin-right: 5%;
  margin-top: 2%;
}

.cognom {
  display: inline-block;
  margin-top: 2%;
}

.ema {
  margin-top: 2%;
  
}

.pass {
  display: inline-block;
  margin-right: 5%;
  margin-top: 2%;
}

.pas {
  display: inline-block;
}

.nascita {
  margin-top: 3%;
}

.no, .cogno, .pa, .p {
  font-size: 125%;
  padding-top: 2%;
  padding-left: 2%;
}

.em {
  font-size: 125%;
}

::-webkit-input-placeholder { color: gray; font-style:italic; font-size: 110%;}
::-moz-input-placeholder { color: gray; font-style:italic; font-size: 110%;}
::-ms-input-placeholder { color: gray; font-style:italic; font-size: 110%;}
</style>
