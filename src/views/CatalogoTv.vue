<template>
  <div class="main">
    <Navbar @search="performSearch" @language-change="changeLanguage" />
    <div id="movie-list" v-if="movies.length" class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-item">
        <div class="card">
          <router-link :to="{ name: 'tv-show-detail', params: { id: movie.id } }">
            <img :src="getMoviePosterUrl(movie.poster_path)" alt="Locandina del film" class="card-img-top">
          </router-link>
          <div class="card-body" style="min-height: 185px;">
            <h5 v-if="movie.title" class="card-title">{{ movie.title }}</h5>
            <h5 v-else class="card-title">{{ movie.name }}</h5>
            <p class="card-text" v-if="!movie.expandedDescription">
              {{ truncateDescription(movie.overview) }}
              <a v-if="shouldShowExpandButton(movie)" @click="toggleDescription(movie)" class="expand-button">
                {{ $t('showMore') }}
              </a>
            </p>
            <p class="card-text" v-else>
              {{ movie.overview }}
              <a @click="toggleDescription(movie)" class="expand-button"> {{ $t('showLess') }} </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <ul v-if="showPagination" class="pagination justify-content-center" style="margin-top: 1%;">
      <li class="page-item">
        <a @click="fetchPrevMovies" v-if="currentPage > 1" class="page-link">Pagina precedente</a>
      </li>
      <li v-if="currentPage != 1" class="page-item"><a class="page-link" href="#" @click="goToPage(1)">1</a></li>
      <li class="page-item"><a class="page-link" href="#" v-if="currentPage > 2" @click="goToPage(currentPage - 1)">{{
        currentPage - 1 }}</a></li>
      <li class="page-item"><a class="page-link current-page" href="#">{{ currentPage }}</a></li>
      <li class="page-item"><a class="page-link" href="#" v-if="currentPage < totalPages - 1"
          @click="goToPage(currentPage + 1)">{{ currentPage + 1 }}</a></li>
      <li v-if="currentPage != totalPages" class="page-item"><a class="page-link" href="#"
          @click="goToPage(totalPages)">{{
            totalPages }}</a></li>
      <li class="page-item">
        <a @click="fetchNextMovies" v-if="currentPage < totalPages" class="page-link" href="#">Pagina successiva</a>
      </li>
    </ul>
  </div>
</template>
  
<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';

export default {
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
      currentLanguage: 'it',
      searchQuery: '',
      currentCategory: 'movie',
      showPagination: true
    };
  },
  mounted() {
    this.$route.query.type;
    console.log(this.$route.query.type);
    if (this.$route.query.type == 'tv') {
      this.currentCategory = 'tv';
    }
    this.fetchMovies();
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchMovies();
        this.scrollToMovieList();
      }
    },
    fetchMovies() {
      const apiKey = import.meta.env.VITE_API_KEY;
      const language = this.currentLanguage;
      const page = this.currentPage;
      const query = this.searchQuery;
      let url = `https://api.themoviedb.org/3/trending/tv/week?page=${page}&api_key=${apiKey}&language=${language}`;
      let url2 = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=${language}&page=${page}${query ? `&query=${query}` : ''}`;
      if (this.searchQuery) {
        url = url2;
      }
      axios
        .get(url)
        .then((response) => {
          this.totalPages = response.data.total_pages - 500;
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
    fetchPrevMovies() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchMovies();
        this.scrollToMovieList();
      }
    },
    fetchNextMovies() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchMovies();
        this.scrollToMovieList();
      }
    },
    scrollToMovieList() {
      const movieList = document.getElementById("movie-list");
      if (movieList) {
        movieList.scrollIntoView({ behavior: "smooth" });
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
    shouldShowExpandButton(movie) {
      return movie.overview.length > 100;
    },
    truncateDescription(description) {
      if (description.length <= 100) {
        return description;
      }
      return description.substring(0, 100) + '...';
    },
    toggleDescription(movie) {
      movie.expandedDescription = !movie.expandedDescription;
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
    goToHomePage() {
      this.currentPage = 1;
      this.fetchMovies();
    },
    performSearch(query) {
      this.searchQuery = query;
      this.currentPage = 1;
      this.fetchMovies();
      this.showPagination = false
    },
    changeLanguage(newLanguage) {
      this.currentLanguage = newLanguage;
      this.fetchMovies();
    },
  },
  components: { Navbar }
};
</script>
  
<style scoped>
.page-link {
  color: black;
  border: 1px solid red;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.current-page {
  background-color: red;
  color: white;
}

.main {
  margin-top: 87px;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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

.movie-item {
  width: 100%;
}

.card {
  background-color: crimson;
  width: 100%;
  color: white;
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

.list-group-item {
  background-color: lightpink;
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

@media (max-width: 1200px) {
  .movie-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .movie-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .movie-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .movie-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>