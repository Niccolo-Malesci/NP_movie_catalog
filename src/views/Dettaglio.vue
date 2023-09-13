<template>
  <div class="card mb-3" style="max-width: 70%;">
    <div class="row g-0">
      <div class="col-md-4">
        <a :href="media.homepage" target="_blank">
          <img :src="getMediaPosterUrl(media.poster_path)" alt="Locandina del media" class="img-fluid rounded-start media-poster">
        </a>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title" style="font-size: xx-large; text-align: center;">{{ media.title || media.name }}</h5>
          <p class="card-text" style="font-weight: bold;">{{ media.tagline }}</p>
          <p>{{ media.overview }}</p>
          <p style="font-style: italic;">Paesi di produzione: {{ getCountries(media.production_countries) }}</p>
          <p style="font-style: italic;">Case di produzione: {{ getCompanies(media.production_companies) }}</p>
          Valutazione:
          <p v-if="(media.vote_average/2)<=0.25">
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average/2)>0.25 && (media.vote_average/2)<=0.75">
              <i class="bi bi-star-half" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average/2)>0.75 && (media.vote_average/2)<=1.25">
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average/2)>1.25 && (media.vote_average/2)<=1.75">
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-half" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average/2)>1.75 && (media.vote_average/2)<=2.25">
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average/2)>2.25 && (media.vote_average/2)<=2.75">
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-half" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average/2)>2.75 && (media.vote_average/2)<=3.25">
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average/2)>3.25 && (media.vote_average/2)<=3.75">
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-half" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average/2)>3.75 && (media.vote_average/2)<=4.25">
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
              <i class="bi bi-star-fill" style="color: yellow;"></i>
          </p>
          <p>Popolarità: {{ media.popularity }}</p>
          <p style="font-weight: bold;">{{ getGenres(media.genres) }}</p>
          <p v-if="media.title" class="card-text" style="color: white; position: absolute; bottom: 0; right: 0; margin: 10px;">
            Durata: {{ media.runtime }} minuti <br> Data di pubblicazione: {{ media.release_date }}
          </p>
          <p v-else class="card-text" style="color: white; position: absolute; bottom: 0; right: 0; margin: 10px;">
            Numero totale di episodi: {{ media.number_of_episodes }} <br> Data di prima pubblicazione: {{ media.first_air_date }}
          </p>
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
      media: {},
    };
  },
  created() {
    const mediaId = this.$route.params.id;
    const mediaType = this.$route.params.media_type;
    this.fetchMediaDetails(mediaId, mediaType);
  },
  methods: {
    fetchMediaDetails(mediaId, mediaType) {
      const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${this.apiKey}&language=${this.language}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.media = data;
        })
        .catch(error => console.error('Errore durante il recupero dei dettagli del media:', error));
    },
    getMediaPosterUrl(posterPath) {
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
.card {
  background-color: crimson;
  color: white;
}
.media-poster {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>