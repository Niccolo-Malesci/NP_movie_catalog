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
    },
    en: {
      searchPlaceholder: 'Search...',
      appTitle: "NP's Movie Catalog",
      showMore: 'Show more',
      showLess: 'Show less',
    },
  },
});

let store = createStore ({
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