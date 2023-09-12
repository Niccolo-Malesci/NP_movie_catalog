<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand">Catalogo</a>
    </div>
    <div class="position-absolute top-0 end-0">
      <button @click="toggleLanguage">{{ currentLanguage === 'en' ? 'Passa a Italiano' : 'Switch to English' }}</button>
    </div>
    <div class="position-absolute top-1 end-0">
      <button @click="setCurrentCategory('movie')" :class="{ 'active': currentCategory === 'movie' }">Film</button>
      <button @click="setCurrentCategory('tv')" :class="{ 'active': currentCategory === 'tv' }">Serie TV</button>
    </div>
    <input v-model="searchQuery" @input="handleSearchInput" placeholder="Cerca..." class="search-input" />
  </nav>
  <div v-if="movies.length" class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-item">
      <div class="card">
        <router-link to="/catalogo/dettaglio">
          <img :src="getMoviePosterUrl(movie.poster_path)" alt="Locandina del film" class="card-img-top">
        </router-link>
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text">{{ movie.overview }}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{ movie.release_date }}</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="pagination-buttons">
    <button @click="fetchPrevMovies" v-if="currentPage > 1" class="pagination-button">Pagina Precedente</button>
    <button @click="fetchNextMovies" v-if="currentPage < totalPages" class="pagination-button">Pagina Successiva</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
      currentLanguage: 'it',
      searchQuery: '',
      currentCategory: 'movie',
    };
  },
  created() {
    this.fetchMovies();
  },
  methods: {
    fetchMovies() {
      const apiKey = '512f81af17888b517a1b456fbce07689';
      const language = this.currentLanguage;
      const page = this.currentPage;
      const query = this.searchQuery;
      const category = this.currentCategory;
      let url = `https://api.themoviedb.org/3/trending/${this.currentCategory}/week?page=${page}&api_key=${apiKey}&language=${language}`;
      let url2 = `https://api.themoviedb.org/3/search/${category}?api_key=${apiKey}&language=${language}&page=${page}${query ? `&query=${query}` : ''}`;

      if (this.searchQuery) {
        url = url2;
      }

      axios
        .get(url)
        .then((response) => {
          this.totalPages = response.data.total_pages;
          this.movies = response.data.results.map((movie) => {
            return {
              ...movie,
              overview: this.getTranslatedOverview(movie.overview, this.currentLanguage),
            };
          });
        })
        .catch((error) => {
          console.error('Errore durante il recupero dei film/serie TV:', error);
        });
    },
    setCurrentCategory(category) {
      this.currentCategory = category;
      this.currentPage = 1;
      this.searchQuery = ''; 
      this.fetchMovies();
    },
    fetchPrevMovies() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchMovies();
      }
    },
    fetchNextMovies() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchMovies();
      }
    },
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'en' ? 'it' : 'en';
      this.fetchMovies();
    },
    getMoviePosterUrl(posterPath) {
      if (!posterPath) {
        return '';
      }
      return `https://image.tmdb.org/t/p/w500/${posterPath}`;
    },
    getTranslatedOverview(overview, language) {
      return overview;
    },

    handleSearchInput() {
      if (this.searchQuery.length >= 2) {
        this.currentPage = 1;
        this.fetchMovies();
      }
      if (this.searchQuery.length === 0) {
        this.currentPage = 1;
        this.fetchMovies();
      }
    },
  },
};
</script>

<style>
.card-img-top {
  height: 450px;
  object-fit: cover;
}

.movie-item {
  width: 100%;
}

.card {
  width: 100%;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
}

.pagination-buttons {
  margin-top: 20px;
  text-align: center;
}

.pagination-button {
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.search-input {
  margin-bottom: 20px;
  padding: 10px;
  font-size: 18px;
  width: 87%;
  border: none;
  border-radius: 5px;
}

button.active {
  background-color: #e50914;
  font-weight: bold;
  color: #fff;
}
</style>
