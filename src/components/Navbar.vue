<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <span style="color: red; font-family: fantasy; font-size: xx-large;">{{ $t('appTitle') }}</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" style="color: white;">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <button @click="setCurrentCategory('movie')" :class="{ 'active': currentCategory === 'movie' }">Film</button>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <button style="width: max-content;" @click="setCurrentCategory('tv')" :class="{ 'active': currentCategory === 'tv' }">Serie-TV</button>
              </a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false" style="color: white;">Lingua</a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">
                    <button @click="toggleLanguage">{{ currentLanguage === 'it' ? 'English' : 'Italian' }}</button>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input v-model="searchQuery" @input="handleSearchInput" :placeholder="$t('searchPlaceholder')" class="form-control mr-2 search-input" />
          </form>
        </div>
      </div>
    </nav>
  </template>
  
  
  <script>  
  import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
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
      const query = this.searchQuery;
      const category = this.currentCategory;

      let url = `https://api.themoviedb.org/3/search/${category}?api_key=${apiKey}&language=${language}&page=${page}${query ? `&query=${query}` : ''}`;

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
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'en' ? 'it' : 'en';
      this.fetchMovies();
      this.$i18n.locale = this.currentLanguage;
    },
    getTranslatedOverview(overview, language) {
      return overview;
    },
    shouldShowExpandButton(movie) {
      return movie.overview.length > 100;
    },
      handleSearchInput() {
      console.log("Ricerca in corso con query:", this.searchQuery);
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
  
  <style scoped>
  .navbar {
  background-color: black;
  padding: 10px 0;
}

.navbar-brand {
  color: red;
  font-family: fantasy;
  font-size: xx-large;
}

.navbar-toggler-icon {
  color: white;
}

.navbar-nav .nav-link {
  color: white;
}

.navbar-nav .nav-link.active {
  font-weight: bold;
  color: #e50914;
}

.dropdown-menu {
  background-color: black;
}

.dropdown-item a {
  color: white;
}

.search-input {
  margin: 10px 0;
  padding: 10px;
  font-size: 18px;
  width: 87%;
  border: none;
  border-radius: 5px;
}

.expand-button {
  color: white;
}

.expand-button:hover {
  text-decoration: underline;
  cursor: pointer;
  color: blueviolet;
}

.card-img-top {
  height: 450px;
  object-fit: cover;
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
</style>
  