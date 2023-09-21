<template>
    <div class="container">
        <h1 class="saluto">{{ $t('hello') }} {{ nome }}!</h1>
        <h2 class="presentazione">{{ $t('chooseGenres') }}</h2>
        <div style="margin-left: 12%;" class="row align-items-start justify-content-center">
            <div style="margin-top: 3%;" v-for="genere in generi" :key="genere" class="col-md-3">
                <div class="form-check">
                    <input style="zoom: 1.5;" class="form-check-input" type="checkbox" :value="genere"
                        v-model="generiSelezionati">
                    <label style="color: white; font-size: 1.2em;" :for="'checkbox_' + genere">
                        {{ $t(genere.toLowerCase()) }}
                    </label>
                </div>
            </div>
        </div>
        <div style="text-align: center;">
            <select v-model="linguaSelezionata" @change="cambiaLingua">
                <option value="it">Italiano</option>
                <option value="en">Inglese</option>
            </select>
        </div>
        <div style="text-align: center;">
            <button style="margin-top: 4%;" @click="salvaInformazioni">{{ $t('continueButton') }}</button>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            generiSelezionati: [],
            nome: '',
            generi: [
                'azione', 'animazione', 'avventura', 'commedia', 'crime', 'documentario', 'dramma', 'famiglia',
                'fantascienza', 'fantasy', 'guerra', 'horror', 'mistero', 'romance', 'storia', 'thriller'
            ],
            linguaSelezionata: 'it',
        };
    },
    methods: {
        salvaInformazioni() {
            this.$store.commit('setGeneriSelezionati', this.generiSelezionati);
            this.$router.push('/catalogo/film');
        },
        cambiaLingua() {
            this.$i18n.locale = this.linguaSelezionata;
        },
        computed: {
            nome() {
                return this.$store.state.nome_registrazione;
            },
        },
    },
};
</script>
  
<style scoped>
.saluto {
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    margin-top: 10%;
    font-size: 500%;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.presentazione {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
</style>
  