<template>
  <div class="card position-absolute top-50 start-50 translate-middle" style="width: 18rem;">
    <form onsubmit="return false;">
      <div class="mb-3">
        <h1 style="text-align: center; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">{{ $t('accesso') }}
        </h1>
        <div class="input-container">
          <div class="email-g">
            <input type="email" id="myEmail" placeholder="e-mail" class="email" v-model="email_accesso">
          </div>
          <div class="password-g">
            <input type="password" id="myPassword" placeHolder="Password" class="password" v-model="password_accesso">
          </div>
          <div style="justify-content: center; align-items: center; display: flex; margin: 5%;">
            <button type="submit" id="theButton" class="pulsante" @click="access">{{ $t('accesso') }}</button>
            <select v-model="linguaSelezionata" @change="cambiaLingua">
              <option value="it">Italiano</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
      <div style="margin: 4%;">
        <p> {{ $t('registrazione2') }} <br>
          <router-link style="display: flex; text-decoration: none; justify-content: right;" to="/registrazione">
            <button @click=" ">{{ $t('registrazione') }}</button>
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email_accesso: '',
      password_accesso: '',
      linguaSelezionata: this.$store.state.currentLanguage,
    };
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
    access() {
      if (this.email_accesso == '') {
        alert('e-mail mancante')
        return false
      }
      if (this.password_accesso == '') {
        alert('Password mancante')
        return false
      }
      if (this.email_accesso != this.$store.state.email_registrazione || this.password_accesso != this.$store.state.password_registrazione) {
        alert('Account non esistente')
        return false
      }
      this.$router.push('/homepage')
    },
  }
};
</script>


<style scoped>
.email-g {
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 5%;
}

.password-g {
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 5%;
}
</style>