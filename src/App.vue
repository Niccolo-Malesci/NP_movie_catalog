# NP_movie_catalog


<template>
  <div>
    <h1 class="catalog-title">{{ translations[currentLanguage].catalogTitle }}</h1>
    <input v-model="searchQuery" @input="handleSearchInput" placeholder="Search..." class="search-input" />
    <div v-if="movies.length" class="movie-list">
      <ul>
        <li v-for="movie in movies" :key="movie.id" class="movie-item">
          <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster" class="movie-poster" />
          <h2 class="movie-title">{{ movie.title }}</h2>
          <p class="movie-release-date">{{ movie.release_date }}</p>
          <p class="movie-overview">{{ movie.overview }}</p>
        </li>
      </ul>
      <div class="pagination-buttons">
        <button @click="fetchPrevMovies" v-if="currentPage > 1" class="pagination-button">{{ translations[currentLanguage].prevPage }}</button>
        <button @click="fetchNextMovies" v-if="currentPage < totalPages" class="pagination-button">{{ translations[currentLanguage].nextPage }}</button>
      </div>
    </div>
    <div v-else>
      <p class="loading-text">{{ translations[currentLanguage].loadingText }}</p>
    </div>
    <div>
      <button @click="toggleLanguage">{{ currentLanguage === 'en' ? 'Switch to Italian' : 'Switch to English' }}</button>
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
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 0,
      currentLanguage: 'it',
      translations: {
        it: {
          loadingText: 'Caricamento in corso...',
          catalogTitle: 'Catalogo di Film',
          prevPage: 'Pagina precedente',
          nextPage: 'Pagina successiva',
          movieDescriptions: {},
        },
        en: {
          loadingText: 'Loading...',
          catalogTitle: 'Movie Catalog',
          prevPage: 'Previous Page',
          nextPage: 'Next Page',
          movieDescriptions: {},
        },
      },
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
          `https://api.themoviedb.org/3/search/${category}?api_key=${apiKey}&language=${language}&page=${page}${
            query ? `&query=${query}` : ''
          }`
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


<style scoped>
.catalog-title {
  font-size: 36px;
  margin-bottom: 40px;
  text-align: center;
  color: #fff;
}

.movie-list {
  list-style: none;
  padding: 0;
}

.movie-item {
  display: flex;
  margin-bottom: 40px;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.7);
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
  font-size: 24px;
  margin: 0;
  color: #fff;
}

.movie-release-date {
  font-size: 18px;
  margin: 0;
  color: #ccc;
}

.movie-overview {
  font-size: 16px;
  color: #fff;
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
  font-size: 24px;
  margin: 20px 0;
  text-align: center;
  color: #fff;
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
}

body {
  background-color: #141414;
  font-family: Arial, sans-serif;
  color: #fff;
  margin: 0;
  padding: 0;
}

footer {
  text-align: center;
  padding: 20px;
  background-color: #000;
  color: #fff;
}
</style>
