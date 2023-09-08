import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Accesso from './views/Accesso.vue'
import Catalogo from './views/Catalogo.vue'
import Registrazione from './views/Registrazione.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'accesso',
      component: Accesso
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: Catalogo
    },
    {
      path: '/registrazione',
      name: 'registrazione',
      component: Registrazione
    }
  ]
})

const app = createApp(App)
createApp(App).mount('#app')

app.use(router)
app.mount('#app')