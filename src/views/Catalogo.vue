<template>
<<<<<<< HEAD
  <nav class="navbar bg-body-tertiary" >
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

    <input v-model="searchQuery" @input="handleSearchInput" placeholder="Cerca..." class="search-input"/>
    <div v-if="movies.length" class="movie-list">
      <div v-for="movie in movies" :key="movie.id">
        <div class="card" style="width: 15%;">
          <img :src="getMoviePosterUrl(movie.poster_path)" alt="Locandina del film" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text">{{ movie.overview }}</p>
            </div>
            <div class="list-group list-group-flush">
              <div class="list-group-item">{{ movie.release_date }}></div>
            </div>
=======
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
    <div v-if="movies.length" class = "movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-list">
      <div class="card" style="width: 15%;">
        <img :src="getMoviePosterUrl(movie.poster_path)" alt="Locandina del film" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text">{{ movie.overview }}</p>
>>>>>>> 94d2e815e816bfb48f1a5ede9b30a3e1b219c427
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{ movie.release_date }}</li>
        </ul>
      </div>
    </div>
    <div class="pagination-buttons">
      <button @click="fetchPrevMovies" v-if="currentPage > 1" class="pagination-button">Pagina Precedente</button>
      <button @click="fetchNextMovies" v-if="currentPage < totalPages" class="pagination-button">Pagina Successiva</button>
    </div>
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
              overview: this.getTranslatedOverview(
                movie.overview,
                this.currentLanguage
              ),
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
      if (this.searchQuery.length >= 3) {
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
<<<<<<< HEAD
  
<style>

  .container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
  }
=======

  <style>
>>>>>>> 94d2e815e816bfb48f1a5ede9b30a3e1b219c427
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
  }*/
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
