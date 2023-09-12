<template>
    <div class="card mb-3" style="max-width: 70%;">
      <div class="row g-0">
        <div class="col-md-4">
          <a :href="movie.homepage" target="_blank">
            <img :src="getMoviePosterUrl(movie.poster_path)" alt="Locandina del film" class="img-fluid rounded-start movie-poster">
          </a>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">{{ movie.tagline }}</p>
            <p>{{ movie.overview }}</p>
            <p style="font-style: italic;">Paesi di produzione: {{ getCountries(movie.production_countries) }}</p>
            <p style="font-style: italic;">Case di produzione: {{ getCompanies(movie.production_companies) }}</p>
            Valutazione: {{ movie.vote_average }}/10
            <p v-if="(movie.vote_average/2)<=0.25">
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
            </p>
            <p v-else-if="(movie.vote_average/2)>0.25 && (movie.vote_average/2)<=0.75">
                <i class="bi bi-star-half" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
            </p>
            <p v-else-if="(movie.vote_average/2)>0.75 && (movie.vote_average/2)<=1.25">
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
            </p>
            <p v-else-if="(movie.vote_average/2)>1.25 && (movie.vote_average/2)<=1.75">
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-half" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
            </p>
            <p v-else-if="(movie.vote_average/2)>1.75 && (movie.vote_average/2)<=2.25">
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
            </p>
            <p v-else-if="(movie.vote_average/2)>2.25 && (movie.vote_average/2)<=2.75">
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-half" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
            </p>
            <p v-else-if="(movie.vote_average/2)>2.75 && (movie.vote_average/2)<=3.25">
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
            </p>
            <p v-else-if="(movie.vote_average/2)>3.25 && (movie.vote_average/2)<=3.75">
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-half" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
            </p>
            <p v-else-if="(movie.vote_average/2)>3.75 && (movie.vote_average/2)<=4.25">
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star" style="color: yellow;"></i>
            </p>
            <p v-else-if="(movie.vote_average/2)>4.25 && (movie.vote_average/2)<=4.75">
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-half" style="color: yellow;"></i>
            </p>
            <p v-else>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
            </p>
            <p>Popolarità: {{ movie.popularity }}</p>
            <p style="font-weight: bold;">{{ getGenres(movie.genres) }}</p>
            <p class="card-text"><small class="text-body-secondary">Durata: {{ movie.runtime }} minuti <br> {{ movie.release_date }}</small></p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        apiKey: '512f81af17888b517a1b456fbce07689',
        language: 'it',
        movie: {},
      };
    },
    created() {
      const movieId = this.$route.params.id;
      this.fetchMovieDetails(movieId);
    },
    methods: {
      fetchMovieDetails(movieId) {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=${this.language}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.movie = data;
          })
          .catch(error => console.error('Errore durante il recupero dei dettagli del film:', error));
      },
      getMoviePosterUrl(posterPath) {
        if (!posterPath) {
          return '';
        }
        return `https://image.tmdb.org/t/p/original/${posterPath}`;
      },
      getGenres(genres) {
        return genres.map(genre => genre.name).join(', ');
      },
      getCountries(countries) {
        return countries.map(country => country.name).join(', ');
      },
      getCompanies(companies) {
        return companies.map(company => company.name).join(', ');
      },
    },
  };
  </script>
  
  <style scoped>
  .movie-poster {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  </style>  