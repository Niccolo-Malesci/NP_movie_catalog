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
            <input type="submit" id="theButton" value="Accedi" class="pulsante" @click="access">
          </div>
        </div>
      </div>
      <div class="iscrizione">
        <p>Non sei ancora membro NP? <br>
          <router-link to="/registrazione">
            <button @click=" ">Clicca qui e registrati!</button>
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import Registrazione from './Registrazione.vue';

export default {
  data() {
    return {
      email_accesso: '',
      password_accesso: '',
    };
  },
  methods: {
    access() {
      if (this.email_accesso == '') {
        alert('e-mail mancante')
        return false
      }
      if (this.password_accesso == '') {
        alert('Password mancante')
        return false
      }
      if (this.email_accesso != Registrazione.email_registrazione || this.password_accesso != Registrazione.password_registrazione) {
        alert('Account non esistente')
        return false
      }
      this.$router.push('/catalogo')
    }
  }
};
</script>


<style></style>