import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import Carousel from 'vue-carousel';
import { createStore } from 'vuex';

const i18n = createI18n({
  locale: 'it',
  messages: {
    it: {
      searchPlaceholder: 'Cerca...',
      appTitle: 'NP Catalogo Film',
      showMore: 'Mostra altro',
      showLess: 'Mostra meno',
      nextPage: 'Pagina successiva',
      prevPage: 'Pagina precedente',
      language: 'Lingua',
      mediaDetails: {
        title: "Titolo",
        tagline: "Slogan",
        overview: "Panoramica",
        productionCountries: "Paesi di produzione",
        productionCompanies: "Case di produzione",
        popularity: "Popolarità",
        genres: "Generi",
        rating: 'Votazione',
        popularity: 'Popolarità',
        duration: "Durata",
        minuts: 'minuti',
        totalNumberOfEpisodes: 'Numero totale di episodi',
        dateOfPublication: "Data di pubblicazione",
      }
    },
    en: {
      searchPlaceholder: 'Search...',
      appTitle: "NP's Movie Catalog",
      showMore: 'Show more',
      showLess: 'Show less',
      nextPage: 'Next page',
      prevPage: 'Previous page',
      language: 'Language',
      mediaDetails: {
        title: "Title",
        tagline: "Tagline",
        overview: "Overview",
        productionCountries: "Production Countries",
        productionCompanies: "Production Companies",
        popularity: "Popularity",
        genres: "Genres",
        rating: 'Rating',
        popularity: 'Popularity',
        duration: "Running time",
        minuts: 'minutes',
        totalNumberOfEpisodes: 'Total number of episodes',
        dateOfPublication: "Publication date",
      }
    },
  },
});

let store = createStore({
  state: {
    email_registrazione: '',
    password_registrazione: '',
    nome_registrazione: '',
    generiSelezionati: [],
    currentLanguage: 'it'
  },
  mutations: {
    setEmail(state, email) {
      state.email_registrazione = email;
    },
    setPassword(state, password) {
      state.password_registrazione = password;
    },
    setNome(state, nome) {
      state.nome_registrazione = nome;
    },
    setCurrentLanguage(state, language) {
      state.currentLanguage = language;
    },
  },
  actions: {
    saveGeneri({ state }, generi) {
      state.generiSelezionati = generi;
    }
  }
})

const app = createApp(App);

app.use(store);
app.use(i18n);
app.use(router);
app.use(Carousel);

app.mount('#app');