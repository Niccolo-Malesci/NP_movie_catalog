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
    preferiti: 'I tuoi generi preferiti verranno contrassegnati da "',
    translateButton: 'Traduci',
    continueButton: 'Continua',
    azione: 'Azione',
    commedia: 'Commedia',
    dramma: 'Dramma',
    fantasy: 'Fantasy',
    horror: 'Horror',
    romance: 'Romantico',
    fantascienza: 'Fantascienza',
    thriller: 'Thriller',
    animazione: 'Animazione',
    documentario: 'Documentario',
    mistero: 'Mistero',
    avventura: 'Avventura',
    famiglia: 'Famiglia',
    crime: 'Crime',
    guerra: 'Guerra',
    storia: 'Storia',
    accesso: 'Accedi',
    tv: 'Serie-TV',
    goBack: 'Torna indietro',
    film: 'Film',
    registrazione: 'Clicca qui e registrati!',
    registrazione2: 'Non sei ancora membro NP?',
    slogan: 'Non è mai stato così semplice:',
    signIn: 'Registrati',
    nascita: 'Inserisci qui la tua data di nascita:',
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
    hello: "Hi",
    chooseGenres: 'Choose your favorite genres:',
    preferiti: 'Your favorite genres will be marked with "',
    translateButton: 'Translate',
    continueButton: 'Continue',
    azione: 'Action',
    commedia: 'Comedy',
    dramma: 'Drama',
    fantasy: 'Fantasy',
    horror: 'Horror',
    romance: 'Romance',
    fantascienza: 'Science Fiction',
    thriller: 'Thriller',
    animazione: 'Animation',
    documentario: 'Documentary',
    mistero: 'Mystery',
    avventura: 'Adventure',
    famiglia: 'Family',
    crime: 'Crime',
    guerra: 'War',
    storia: 'History',
    accesso: 'Log in',
    tv: 'TV-Series',
    goBack: 'Go back',
    film: 'Movie',
    registrazione: 'Click here and register!',
    registrazione2: 'Not an NP member yet?',
    slogan: 'It has never been so simple:',
    signIn: 'Sign in',
    nascita: 'Enter your date of birth here:',
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