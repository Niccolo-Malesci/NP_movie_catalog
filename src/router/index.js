import { createRouter, createWebHistory } from 'vue-router'
import Accesso from '/src/views/Accesso.vue'
import Catalogo from '/src/views/Catalogo.vue'
import Registrazione from '/src/views/Registrazione.vue'
import Dettaglio from '/src/views/Dettaglio.vue'

export const router = createRouter({
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
    },
    {
      path: '/catalogo/dettaglio',
      name: 'dettaglio',
      component: Dettaglio
    }
  ]
})

export default router
