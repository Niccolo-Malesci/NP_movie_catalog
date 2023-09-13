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

app.use(i18n); 
app.mount('#app');