<template>
    <div>
      <div>
        <div class="card mb-3" style="max-width: 70%;">
            <div class="row g-0">
                <div class="col-md-4">
                    <a :href="movie.homepage" target="_blank"><img :src="getMoviePosterUrl(movie.poster_path)" alt="Locandina del film" class="img-fluid rounded-start"></a>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ movie.title }}</h5>
                        <p class="card-text"> {{ movie.tagline }} </p>
                        <p> {{ movie.overview }}</p>
                        <p> Paesi di produzione: {{ getCountries(movie.production_countries) }} </p>
                        <p> Case di produzione: {{ getCompanies(movie.production_companies) }}</p>
                        <p> Valutazione: {{ movie.vote_average }}/10 </p>
                        <p> Popolarità: {{ movie.popularity }}</p>
                        <p> {{ getGenres(movie.genres) }} </p>
                        <p class="card-text"><small class="text-body-secondary">Durata: {{ movie.runtime }} minuti <br> {{ movie.release_date }}</small></p>
                    </div>
                </div>
            </div>
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
        homepage: '',
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