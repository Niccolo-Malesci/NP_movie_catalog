<template>
  <div class="card card position-absolute top-50 start-50 translate-middle" style="width: 18rem;">
  <form>
  <div class="mb-3">
    <h1>Registrati!</h1>
    <h2>Non è mai stato così semplice:</h2>
    <div v-if="controllo" class="input-container">
      <div class="nome-g">
        <input type="text" id="myName" placeholder="Nome" class="nome" v-model="nome_registrazione" maxlength="50">
      </div>
      <div class="cognome-g">
        <input type="text" id="mySurname" placeholder="Cognome" class="cognome" v-model="cognome_registrazione" maxlength="50">
      </div>
      <div class="email-g">
        <input type="email" id="myEmail" placeholder="e-mail" class="email" v-model="email_registrazione" maxlength="320">
      </div>
      <div class="password-g">
        <input type="password" id="myPassword" placeholder="Password" class="password" v-model="password_registrazione">
      </div>
      <div class="password-gc">
        <input type="password" id="myPassword" placeholder="Conferma Password" class="password-c" v-model="passwordC_registrazione">
      </div>
      <div class="nascita-g">
        <p>Inserisci qui la tua data di nascita:</p>
        <input type="date" id="birthday" class="nascita">
      </div>
      <RouterLink to="/">
          <input type="submit" id="theButton" value="Registrati" class="button" v-on:click="controllo">
        </RouterLink>
    </div>
  </div>
</form>
</div>
</template>


<script>
export default {
  data () {
    return {
      nome_registrazione: '',
      cognome_registrazione: '',
      email_registrazione: '',
      password_registrazione: '',
      data_registrazione: '',
      passwordC_registrazione: ''
    }
  },
  methods: {
    controllo() {
      if (this.nome_registrazione == '') {
        alert('Nome mancante')
        return false
      };
      if (this.cognome_registrazione == '') {
        alert('Cognome mancante')
        return false
      };
      if (this.email_registrazione == '') {
        alert('e-mail mancante')
        return false
      };
      if (this.password_registrazione == '') {
        alert('Password mancante')
        return false
      };
      if (this.passwordC_registrazione == '') {
        alert('Conferma Password mancante')
        return false
      };
      if (this.data_registrazione == null) {
        alert('Data di nascita mancante')
        return false
      };
      if (this.passwordC_registrazione != this.password_registrazione) {
        alert('Password e Conferma Password non coincidono')
        return false
      };
      if (this.password_registrazione.length !== 8) {
        alert ('La Password deve essere 8 caratteri')
        return false
      };
      if (this.email_registrazione.includes("@") == false) {
        alert ('e-mail non valida')
        return false
      }
      return true
    },
  }
}
</script>


<style>
</style>