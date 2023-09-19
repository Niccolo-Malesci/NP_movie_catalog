<template>
    <div class="main">
        <Navbar @language-change="changeLanguage" />
        <MediaDetailCard :media="movie" />
        <MediaCarousel :chunkedRecommendedMedia="recommendedMovies" :currentSlideIndex="currentSlideIndex"
            currentCategory="movie" />
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
            movie: {},
            recommendedMovies: [],
            currentSlideIndex: 0,
        };
    },
    created() {
        const movieId = this.$route.params.id;
        const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=${this.language}`;
        const recommendedMoviesUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${this.apiKey}&language=${this.language}`;

        fetch(movieUrl)
            .then(response => response.json())
            .then(data => {
                this.movie = data;
            })
            .catch(error => console.error('Errore durante il recupero dei dettagli del film:', error));

        fetch(recommendedMoviesUrl)
            .then(response => response.json())
            .then(data => {
                this.recommendedMovies = data.results;
            })
            .catch(error => console.error('Errore durante il recupero dei film consigliati:', error));
    },
    components: { Navbar, MediaDetailCard, MediaCarousel },
};
</script>
  
<style scoped>
.main {
    margin-top: 87px;
}
</style>
  