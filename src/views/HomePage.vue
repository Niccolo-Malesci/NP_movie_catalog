<template>
    <div class="container">
        <h1 class="saluto">Ciao {{ nome }}!</h1>
        <h2 class="presentazione">Scegli i tuoi generi preferiti:</h2>
        <div class="row align-items-start justify-content-center">
            <div style="margin-top: 3%;" v-for="genere in generi" :key="genere" class="col-md-3">
                <div class="form-check">
                    <input style="zoom: 1.5;" class="form-check-input" type="checkbox" :value="genere"
                        v-model="generiSelezionati">
                    <label style="color: white; font-size: 1.2em;" :for="'checkbox_' + genere">
                        {{ genere }}
                    </label>
                </div>
            </div>
        </div>
        <div style="text-align: center;">
            <button style="margin-top: 4%;" @click="salvaInformazioni">Continua</button>
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
                'Azione', 'Commedia', 'Drammatico', 'Fantasy', 'Horror',
                'Romantico', 'Science Fiction', 'Thriller', 'Animazione', 'Documentario'
            ]
        };
    },
    methods: {
        salvaGeneri(generi) {
            this.$store.commit('setGeneriSelezionati', generi);
        },
        salvaInformazioni() {
            this.salvaGeneri(this.generiSelezionati);
            this.$router.push('/catalogo/film');
        }
    },
    computed: {
        nome() {
            return this.$store.state.nome_registrazione;
        },
        generiSelezionati: {
            get() {
                return this.$store.state.generiSelezionati;
            },
            set(val) {
                this.$store.commit('setGeneriSelezionati', val);
            }
        }
    }
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