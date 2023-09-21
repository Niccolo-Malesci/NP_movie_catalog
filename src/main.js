import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import Carousel from 'vue-carousel';
import { createStore } from 'vuex';

const messages = {
  it: {
    searchPlaceholder: 'Cerca...',
    appTitle: 'NP Catalogo Film',
    showMore: 'Mostra altro',
    showLess: 'Mostra meno',
    nextPage: 'Pagina successiva',
    prevPage: 'Pagina precedente',
    language: 'Lingua',
    hello: 'Ciao',
    chooseGenres: 'Scegli i tuoi generi preferiti:',
    translateButton: 'Traduci',
    continueButton: 'Continua',
    azione: 'Azione',
    commedia: 'Commedia',
    drammatico: 'Drammatico',
    fantasy: 'Fantasy',
    horror: 'Horror',
    romantico: 'Romantico',
    fantascienza: 'Fantascienza',
    thriller: 'Thriller',
    animazione: 'Animazione',
    documentario: 'Documentario',
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
    hello: "Hello",
    chooseGenres: 'Choose your favorite genres:',
    translateButton: 'Translate',
    continueButton: 'Continue',
    azione: 'Action',
    commedia: 'Comedy',
    drammatico: 'Drama',
    fantasy: 'Fantasy',
    horror: 'Horror',
    romantico: 'Romantic',
    fantascienza: 'Science Fiction',
    thriller: 'Thriller',
    animazione: 'Animation',
    documentario: 'Documentary',
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
};

const i18n = createI18n({
  locale: 'it',
  messages: messages,
});

let store = createStore({
  state: {
    email_registrazione: '',
    password_registrazione: '',
    nome_registrazione: '',
    currentLanguage: 'it',
    genere: []
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
    setGenres(state, genre) {
      state.genere = genre
    }
  },
})

const app = createApp(App);

app.use(store);
app.use(i18n);
app.use(router);
app.use(Carousel);

app.mount('#app');