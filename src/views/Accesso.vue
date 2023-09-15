<template>
<div class="card position-absolute top-50 start-50 translate-middle" style="width: 18rem;">
  <form>
  <div class="mb-3">
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
        <input type="submit" id="theButton" value="Accedi" class="pulsante">
      </router-link>
      </div>
      <div class="iscrizione">
        <p>Non sei ancora membro NP? <br> 
          <router-link to="/registrazione"><button @click = " ">Clicca qui e registrati!</button></router-link></p>
      </div>
  </div>
</div>
</form>
</div>
</template>

<script>
export default {
  data () {
    return {
      email_accesso: '',
      password_accesso: '',
    };
  },
  methods: {
  }
};
</script>


<style>
</style>