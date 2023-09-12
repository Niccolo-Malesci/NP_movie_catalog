import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n';

const app = createApp(App)

app.use(router)

const i18n = createI18n({
  locale: 'it',
  messages: {
    it: {
      searchPlaceholder: 'Cerca...',
      appTitle: 'NP Catalogo Film',
    },
    en: {
      searchPlaceholder: 'Search...',
      appTitle: "NP's Movie Catalog",
    },
  },
});

app.use(i18n); 
app.mount('#app');
