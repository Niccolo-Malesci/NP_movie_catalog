<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid" style="width: max-content;">
    <a class="navbar-brand" href="#">{{ $t('appTitle') }}</a>
  </div>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><button @click="setCurrentCategory('movie')" :class="{ 'active': currentCategory === 'movie' }">Film</button></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><button style="width: max-content;" @click="setCurrentCategory('tv')" :class="{ 'active': currentCategory === 'tv' }">Serie-TV </button></a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Lingua</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#"><button @click="toggleLanguage">{{ currentLanguage === 'it' ? 'English' : 'Italian' }}</button></a></li>
          </ul>
        </li>
      </ul>
    </div>
  <form class="d-flex" role="search" >
    <input v-model="searchQuery" @input="handleSearchInput" :placeholder="$t('searchPlaceholder')" class="search-input" />
  </form>
</nav> 
  <div v-if="movies.length" class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-item">
      <div class="card">
        <router-link :to="{ name: 'dettaglio', params: { id: movie.id }}">
          <img :src="getMoviePosterUrl(movie.poster_path)" alt="Locandina del film" class="card-img-top">
        </router-link>
        <div class="card-body">
          <h5 v-if="movie.title" class="card-title">{{ movie.title }}</h5>
          <h5 v-else class="card-title">{{ movie.name }}</h5>
          <p  class="card-text">{{ movie.overview }}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li v-if="movie.release_date" class="list-group-item">{{ movie.release_date }}</li>
          <li v-else class="list-group-item">{{ movie.first_air_date }}</li>
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
      this.$i18n.locale = this.currentLanguage;
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