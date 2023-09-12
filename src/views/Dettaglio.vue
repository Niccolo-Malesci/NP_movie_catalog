<template>
    <div>
      <h1>{{ movie.title }}</h1>
      <div>
        <div>
          <img :src="getMoviePosterUrl(movie.poster_path)" alt="Locandina del film">
        </div>
        <div>
          <p><strong>Data di uscita:</strong> {{ formatReleaseDate(movie.release_date) }}</p>
          <p><strong>Valutazione:</strong> {{ movie.vote_average }}/10</p>
          <p v-if="movie.tagline"><strong>Tagline:</strong> {{ movie.tagline }}</p>
          <p v-if="movie.homepage"><strong>Sito Web:</strong> <a :href="movie.homepage" target="_blank">{{ movie.homepage }}</a></p>
          <p v-if="movie.runtime"><strong>Durata:</strong> {{ formatRuntime(movie.runtime) }} minuti</p>
          <p v-if="movie.genres.length"><strong>Generi:</strong> {{ getGenres(movie.genres) }}</p>
          <p v-if="movie.production_countries.length"><strong>Paese di produzione:</strong> {{ getProductionCountries(movie.production_countries) }}</p>
          <p v-if="movie.production_companies.length"><strong>Case di produzione:</strong> {{ getProductionCompanies(movie.production_companies) }}</p>
          <p v-if="movie.overview"><strong>Trama:</strong> {{ movie.overview }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        apiKey: '6f9286d54de4891ea7a5c91779e09786',
        language: 'it',
        movie: {},
      };
    },
    created() {
      this.fetchMovieDetails();
    },
    methods: {
      fetchMovieDetails() {
        const url = `https://api.themoviedb.org/3/movie/346698?api_key=${this.apiKey}&language=${this.language}`;
  
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
        return `https://image.tmdb.org/t/p/w500/${posterPath}`;
      },
      formatReleaseDate(date) {
        return new Date(date).toLocaleDateString(this.language);
      },
      formatRuntime(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
      },
      getGenres(genres) {
        return genres.map(genre => genre.name).join(', ');
      },
      getProductionCountries(countries) {
        return countries.map(country => country.name).join(', ');
      },
      getProductionCompanies(companies) {
        return companies.map(company => company.name).join(', ');
      },
    },
  };
  </script>
  
  <style scoped>
  </style>