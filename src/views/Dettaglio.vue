<template>
  <div class="main">
  <div class="card mb-3" style="max-width: 70%;">
    <div class="row g-0">
      <div class="col-md-4">
        <a :href="media.homepage" target="_blank">
          <img :src="getMediaPosterUrl(media.poster_path)" alt="Locandina del media"
            class="img-fluid rounded-start media-poster">
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
          <p v-if="(media.vote_average / 2) <= 0.25">
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average / 2) > 0.25 && (media.vote_average / 2) <= 0.75">
            <i class="bi bi-star-half" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average / 2) > 0.75 && (media.vote_average / 2) <= 1.25">
            <i class="bi bi-star-fill" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average / 2) > 1.25 && (media.vote_average / 2) <= 1.75">
            <i class="bi bi-star-fill" style="color: yellow;"></i>
            <i class="bi bi-star-half" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average / 2) > 1.75 && (media.vote_average / 2) <= 2.25">
            <i class="bi bi-star-fill" style="color: yellow;"></i>
            <i class="bi bi-star-fill" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average / 2) > 2.25 && (media.vote_average / 2) <= 2.75">
            <i class="bi bi-star-fill" style="color: yellow;"></i>
            <i class="bi bi-star-fill" style="color: yellow;"></i>
            <i class="bi bi-star-half" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average / 2) > 2.75 && (media.vote_average / 2) <= 3.25">
            <i class="bi bi-star-fill" style="color: yellow;"></i>
            <i class="bi bi-star-fill" style="color: yellow;"></i>
            <i class="bi bi-star-fill" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average / 2) > 3.25 && (media.vote_average / 2) <= 3.75">
            <i class="bi bi-star-fill" style="color: yellow;"></i>
            <i class="bi bi-star-fill" style="color: yellow;"></i>
            <i class="bi bi-star-fill" style="color: yellow;"></i>
            <i class="bi bi-star-half" style="color: yellow;"></i>
            <i class="bi bi-star" style="color: yellow;"></i>
          </p>
          <p v-else-if="(media.vote_average / 2) > 3.75 && (media.vote_average / 2) <= 4.25">
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
          <p v-if="media.title" class="card-text"
            style="color: white; position: absolute; bottom: 0; right: 0; margin: 10px;">
            Durata: {{ media.runtime }} minuti <br> Data di pubblicazione: {{ media.release_date }}
          </p>
          <p v-else class="card-text" style="color: white; position: absolute; bottom: 0; right: 0; margin: 10px;">
            Numero totale di episodi: {{ media.number_of_episodes }} <br> Data di prima pubblicazione: {{
              media.first_air_date }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="carousel-container">
    <div class="carousel slide" id="myCarousel" data-bs-ride="carousel" v-if="currentSlideIndex < 4">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carousel-container" data-bs-slide-to="0" class="active" aria-current="true"
          aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carousel-container" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carousel-container" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carousel-container" data-bs-slide-to="3" aria-label="Slide 4"></button>
        <button type="button" data-bs-target="#carousel-container" data-bs-slide-to="4" aria-label="Slide 5"></button>
      </div>
      <div class="carousel-inner" style="margin-left: 11%;">
        <div :class="['carousel-item', index === currentSlideIndex ? 'active' : '']"
          v-for="(recommended, index) in chunkedRecommendedMedia" :key="index">
          <div class="row" style="width: 95%;">
            <router-link :to="{ name: 'dettaglio', params: { id: media.id, media_type: this.currentCategory } }" 
            v-for="(media, mediaIndex) in recommended" :key="mediaIndex" class="col-md-2" @click="fetchMediaDetails(media.id, this.currentCategory)">
              <img :src="getMediaPosterUrl(media.poster_path)" class="d-block w-100" alt="Media Consigliato">
            </router-link>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      apiKey: import.meta.env.VITE_API_KEY,
      language: 'it',
      media: {},
      recommendedMedia: [],
      chunkedRecommendedMedia: [],
      currentSlideIndex: 0,
    };
  },
  created() {
    const mediaId = this.$route.params.id;
    const mediaType = this.$route.params.media_type;
    const recommendedMediaUrl = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/recommendations?api_key=${this.apiKey}&language=${this.language}`;

    fetch(recommendedMediaUrl)
      .then(response => response.json())
      .then(data => {
        this.recommendedMedia = data.results;
        this.chunkedRecommendedMedia = this.chunkArray(this.recommendedMedia, 5);
      })
      .catch(error => console.error('Errore durante il recupero dei media consigliati:', error));

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
    updateCurrentSlide(index) {
      this.currentSlideIndex = index;
    },
    slideNext() {
      const nextIndex = (this.currentSlideIndex + 1) % this.chunkedRecommendedMedia.length;
      this.currentSlideIndex = nextIndex;
    },
    slidePrev() {
      const prevIndex = (this.currentSlideIndex - 1 + this.chunkedRecommendedMedia.length) % this.chunkedRecommendedMedia.length;
      this.currentSlideIndex = prevIndex;
    },
    chunkArray(arr, chunkSize) {
      const chunkedArray = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        chunkedArray.push(arr.slice(i, i + chunkSize));
      }
      return chunkedArray;
    },
  }
};
</script>

<style scoped>
.main {
  margin-top: 87px;
}
.card {
  background-color: crimson;
  color: white;
}

.media-poster {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.carousel-container {
  max-width: 70%;
  max-height: 500px;
  margin: 0 auto;
  overflow: hidden;
}

.carousel {
  width: 100%;
}

.carousel-inner {
  display: flex;
  flex-wrap: nowrap;
  transition: transform 0.5s ease;
}

.carousel-item {
  flex: 0 0 100%;
}

.carousel-item img {
  width: 100%;
  max-height: 250px;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.carousel-control-prev,
.carousel-control-next {
  z-index: 1;
}

.carousel-control-prev {
  margin-right: 20px;
}

.carousel-control-next {
  margin-left: 20px;
}

.carousel-indicators {
  margin-bottom: -10px;
}</style>