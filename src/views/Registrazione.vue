<template>
  <div class="card card position-absolute top-50 start-50 translate-middle" style="width: 30rem;">
    <form onsubmit="return false;">
      <div class="mb-3">
        <h1
          style="text-align: center; margin-top: 2%; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
          {{ $t('signIn') }}!</h1>
        <h2 style="text-align: center; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">{{
          $t('slogan') }}</h2>
        <div class="input-container">
          <div style="justify-content: center; align-items: center; display: flex;">
            <div class="nome-g">
              <input type="text" id="myName" placeholder="Nome" class="nome" v-model="nome_registrazione" maxlength="50">
            </div>
            <div class="cognome-g">
              <input type="text" id="mySurname" placeholder="Cognome" class="cognome" v-model="cognome_registrazione"
                maxlength="50">
            </div>
          </div>
          <div style="justify-content: center; align-items: center; display: flex;">
            <div class="password-g">
              <input type="password" id="myPassword" placeholder="Password" class="password"
                v-model="password_registrazione">
            </div>
            <div class="password-gc">
              <input type="password" id="myPassword" placeholder="Conferma Password" class="password-c"
                v-model="passwordC_registrazione">
            </div>
          </div>
          <div class="email-g">
            <input type="email" id="myEmail" placeholder="e-mail" class="email" v-model="email_registrazione"
              maxlength="320">
          </div>
          <div class="nascita-g">
            <p>{{ $t('nascita') }}</p>
            <input type="date" id="birthday" class="nascita">
          </div>
          <div style="justify-content: center; align-items: center; display: flex; margin-top: 4%;">
            <button type="submit" id="theButton" class="button" @click="controllo">{{ $t('signIn') }}</button>
            <select v-model="linguaSelezionata" @change="cambiaLingua">
              <option value="it">Italiano</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>


<script>


export default {
  data() {
    return {
      nome_registrazione: '',
      cognome_registrazione: '',
      email_registrazione: '',
      password_registrazione: '',
      data_registrazione: '',
      passwordC_registrazione: '',
      linguaSelezionata: this.$store.state.currentLanguage,
    }
  },
  methods: {
    cambiaLingua() {
      if (this.$store.state.currentLanguage == 'en') {
        this.$store.commit('setCurrentLanguage', 'it');
      }
      else {
        this.$store.commit('setCurrentLanguage', 'en');
      }
      this.$i18n.locale = this.linguaSelezionata;
    },
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
        alert('La Password deve essere 8 caratteri')
        return false
      };
      if (this.email_registrazione.includes("@") == false) {
        alert('e-mail non valida')
        return false
      }
      this.$store.commit('setEmail', this.email_registrazione);
      this.$store.commit('setPassword', this.password_registrazione);
      this.$store.commit('setNome', this.nome_registrazione);
      alert('Registrazione avvenuta con successo!')
      this.$router.push('/')
    },
  }
}
</script>


<style scoped>
.nome-g,
.cognome-g,
.password-g,
.password-gc {
  display: inline-block;
  margin: 2%;
}

.email-g {
  margin: 2%;
  justify-content: center;
  align-items: center;
  display: flex;
}

.nascita-g {
  margin-left: 4%;
  margin-top: 4%;
}
</style>