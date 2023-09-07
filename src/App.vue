<template>
  <div>
    <h1 class="catalog-title">{{ currentLanguage === 'it' ? 'Catalogo di Film' : 'Movie Catalog' }}</h1>
    <input v-model="searchQuery" @input="handleSearchInput" placeholder="Search..." class="search-input" />
    <div v-if="movies.length" class="movie-list">
      <ul>
        <li v-for="movie in movies" :key="movie.id" class="movie-item">
          <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster" class="movie-poster" />
          <h2 class="movie-title">{{ movie.title }}</h2>
          <p class="movie-release-date">{{ movie.release_date }}</p>
          <p class="movie-overview">{{ getTranslatedOverview(movie.overview, currentLanguage) }}</p>
        </li>
      </ul>
      <div class="pagination-buttons">
        <button @click="fetchPrevMovies" v-if="currentPage > 1" class="pagination-button">{{ currentLanguage === 'it' ? 'Pagina precedente' : 'Previous Page' }}</button>
        <button @click="fetchNextMovies" v-if="currentPage < totalPages" class="pagination-button">{{ currentLanguage === 'it' ? 'Pagina successiva' : 'Next Page' }}</button>
      </div>
    </div>
    <div v-else>
      <p class="loading-text">{{ currentLanguage === 'it' ? 'Caricamento in corso...' : 'Loading...' }}</p>
    </div>
    <div>
      <button @click="switchToItalian" v-if="currentLanguage === 'en'">Switch to Italian</button>
      <button @click="switchToEnglish" v-if="currentLanguage === 'it'">Switch to English</button>
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
          movieDescriptions: {
          },
        },
        en: {
          loadingText: 'Loading...',
          catalogTitle: 'Movie Catalog',
          prevPage: 'Previous Page',
          nextPage: 'Next Page',
          movieDescriptions: {
          },
        },
      },
      searchQuery: '', 
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
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${language}&page=${page}&query=${query}`)
        .then((response) => {
          this.totalPages = response.data.total_pages;
          this.movies = response.data.results.map((movie) => {
            const translatedOverview = this.getTranslatedOverview(movie.overview, this.currentLanguage);
            return {
              ...movie,
              overview: translatedOverview,
            };
          });
        })
        .catch((error) => {
          console.error('Errore durante il recupero dei film:', error);
        });
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
    getMoviePosterUrl(posterPath) {
      return `https://image.tmdb.org/t/p/w500/${posterPath}`;
    },
    switchToEnglish() {
      this.currentLanguage = 'en';
      this.fetchMovies();
    },
    switchToItalian() {
      this.currentLanguage = 'it';
      this.fetchMovies();
    },
    getTranslatedOverview(overview, language) {
      const languageTranslations = this.translations[language];

      if (languageTranslations && languageTranslations.movieDescriptions[overview]) {
        return languageTranslations.movieDescriptions[overview];
      }

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
  font-size: 24px;
  margin-bottom: 20px;
}

.movie-list {
  list-style: none;
  padding: 0;
}

.movie-item {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}

.movie-poster {
  max-width: 150px;
  margin-right: 20px;
}

.movie-title {
  font-size: 20px;
  margin: 0;
}

.movie-release-date {
  font-size: 16px;
  margin: 0;
}

.movie-overview {
  font-size: 14px;
}

.pagination-buttons {
  margin-top: 20px;
}

.pagination-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

.loading-text {
  font-size: 16px;
  margin: 20px 0;
}

.search-input {
  margin-bottom: 20px;
  padding: 5px 10px;
  font-size: 14px;
}
</style>