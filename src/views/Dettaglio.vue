<template>
  <div class="main">
    <Navbar @language-change="changeLanguage" />
    <MediaDetailCard :media="media" />
    <MediaCarousel :recommendedMedia="recommendedMedia" :currentSlideIndex="currentSlideIndex" />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import MediaDetailCard from '../components/MediaDetailCard.vue';
import MediaCarousel from '../components/MediaCarousel.vue';

export default {
  data() {
    return {
      apiKey: import.meta.env.VITE_API_KEY,
      language: 'it',
      media: {},
      recommendedMedia: [],
      currentSlideIndex: 0,
    };
  },
  created() {
    this.fetchMediaDetails(this.$route.params.id, this.$route.params.media_type);
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
  },
  components: { Navbar, MediaDetailCard, MediaCarousel },
};
</script>

<style scoped>
.main {
  margin-top: 87px;
}
</style>
