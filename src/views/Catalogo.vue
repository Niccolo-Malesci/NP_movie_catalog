<template>
    <div class="catalogo">
      <h1>Catalogo</h1>
      <input v-model="searchQuery" @input="handleSearchInput" placeholder="Cerca..." class="search-input" />
      <div v-if="movies.length" class="movie-list">
        <ul>
          <li v-for="movie in movies" :key="movie.id" class="movie-item">
            <img :src="getMoviePosterUrl(movie.poster_path)" alt="Locandina del film" class="movie-poster" />
            <h2 class="movie-title">{{ movie.title }}</h2>
            <p class="movie-release-date">{{ movie.release_date }}</p>
            <p class="movie-overview">{{ movie.overview }}</p>
          </li>
        </ul>
        <div class="pagination-buttons">
          <button @click="fetchPrevMovies" v-if="currentPage > 1" class="pagination-button">Pagina Precedente</button>
          <button @click="fetchNextMovies" v-if="currentPage < totalPages" class="pagination-button">Pagina Successiva</button>
        </div>
      </div>
      <div v-else>
        <p class="loading-text">Caricamento in corso...</p>
      </div>
      <div>
        <button @click="toggleLanguage">{{ currentLanguage === 'en' ? 'Passa a Italiano' : 'Switch to English' }}</button>
      </div>
      <div>
        <button @click="setCurrentCategory('movie')" :class="{ 'active': currentCategory === 'movie' }">Film</button>
        <button @click="setCurrentCategory('tv')" :class="{ 'active': currentCategory === 'tv' }">Serie TV</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    beforeRouteEnter(to, from, next) {
    if (to.name === 'catalogo') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'src\assets\catalogo.css';
      document.head.appendChild(link);
    }
    next();
    },
    data() {
      return {
        movies: [],
        currentPage: 1,
        totalPages: 0,
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
  
        axios
          .get(
            `https://api.themoviedb.org/3/search/${category}?api_key=${apiKey}&language=${language}&page=${page}${query ? `&query=${query}` : ''}`
          )
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
        this.currentPage = 1;
        this.fetchMovies();
      },
    },
  };
  </script>
  
  <style>
  /*.catalogo {
    font-size: 24px;
    margin-bottom: 40px;
    text-align: center;
    color: #333;
    padding: 20px;
    background-color: purple;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  .movie-list {
    list-style: none;
    padding: 0;
  }
  
  .movie-item {
    display: flex;
    margin-bottom: 20px;
    align-items: flex-start;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  .movie-poster {
    max-width: 150px;
    margin-right: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  .movie-title {
    font-size: 20px;
    margin: 0;
    color: #333;
  }
  
  .movie-release-date {
    font-size: 16px;
    margin: 0;
    color: #777;
  }
  
  .movie-overview {
    font-size: 16px;
    color: #555;
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
  
  .loading-text {
    font-size: 20px;
    margin: 20px 0;
    text-align: center;
    color: #555;
  }
  
  .search-input {
    margin-bottom: 20px;
    padding: 10px;
    font-size: 18px;
    width: 100%;
    border: none;
    border-radius: 5px;
  }
  
  button.active {
    background-color: #e50914;
    font-weight: bold;
    color: #fff;
  }*/
  </style>