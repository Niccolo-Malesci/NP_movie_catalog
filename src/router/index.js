import { createRouter, createWebHistory } from 'vue-router';
import Accesso from '../views/Accesso.vue';
import CatalogoTv from '../views/CatalogoTv.vue';
import Registrazione from '../views/Registrazione.vue';
import MovieDetail from '../views/MovieDetail.vue';
import TvShowDetail from '../views/TVShowDetail.vue';
import CatalogoFilm from '../views/CatalogoFilm.vue';
import Homepage from '../views/HomePage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage,
    },
    {
      path: '/',
      name: 'accesso',
      component: Accesso,
    },
    {
      path: '/catalogo/tv',
      name: 'catalogo-tv',
      component: CatalogoTv,
    },
    {
      path: '/catalogo/film',
      name: 'catalogo-film',
      component: CatalogoFilm,
    },
    {
      path: '/registrazione',
      name: 'registrazione',
      component: Registrazione,
    },
    {
      path: '/dettaglio/movie/:id',
      name: 'movie-detail',
      component: MovieDetail,
    },
    {
      path: '/dettaglio/tv/:id',
      name: 'tv-show-detail',
      component: TvShowDetail,
    },
  ],
});

export default router;
