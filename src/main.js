import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import Carousel from 'vue-carousel';
import { createStore } from 'vuex';

const app = createApp(App);

app.use(router);

const i18n = createI18n({
  locale: 'it',
  messages: {
    it: {
      searchPlaceholder: 'Cerca...',
      appTitle: 'NP Catalogo Film',
      showMore: 'Mostra altro',
      showLess: 'Mostra meno',
      mediaDetails: {
        title: "Titolo",
        tagline: "Slogan",
        overview: "Panoramica",
        productionCountries: "Paesi di produzione",
        productionCompanies: "Case di produzione",
        popularity: "Popolarità",
        genres: "Generi",
        duration: "Durata",
        dateOfPublication: "Data di pubblicazione"
      }
    },
    en: {
      searchPlaceholder: 'Search...',
      appTitle: "NP's Movie Catalog",
      showMore: 'Show more',
      showLess: 'Show less',
      mediaDetails: {
        title: "Title",
        tagline: "Tagline",
        overview: "Overview",
        productionCountries: "Production Countries",
        productionCompanies: "Production Companies",
        popularity: "Popularity",
        genres: "Genres",
        duration: "Duration",
        dateOfPublication: "Date of publication"
      }
    },
  },
});

let store = createStore({
  state: {
    email_registrazione: '',
    password_registrazione: '',
  },
  mutations: {
    setEmail(state, email) {
      state.email_registrazione = email;
    },
    setPassword(state, password) {
      state.password_registrazione = password;
    },
  },
})

app.use(i18n);

app.use(Carousel);

app.mount('#app');

app.use(store);