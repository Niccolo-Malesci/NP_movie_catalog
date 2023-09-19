<template>
    <div class="main">
        <Navbar @language-change="changeLanguage" />
        <MediaDetailCard :media="tvShow" />
        <MediaCarousel :chunkedRecommendedMedia="recommendedTvShows" :currentSlideIndex="currentSlideIndex"
            currentCategory="tv" />
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
            tvShow: {},
            recommendedTvShows: [],
            currentSlideIndex: 0,
        };
    },
    created() {
        const tvShowId = this.$route.params.id;
        const tvShowUrl = `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${this.apiKey}&language=${this.language}`;
        const recommendedTvShowsUrl = `https://api.themoviedb.org/3/tv/${tvShowId}/recommendations?api_key=${this.apiKey}&language=${this.language}`;

        fetch(tvShowUrl)
            .then(response => response.json())
            .then(data => {
                this.tvShow = data;
            })
            .catch(error => console.error('Errore durante il recupero dei dettagli della serie TV:', error));

        fetch(recommendedTvShowsUrl)
            .then(response => response.json())
            .then(data => {
                this.recommendedTvShows = data.results;
            })
            .catch(error => console.error('Errore durante il recupero delle serie TV consigliate:', error));
    },
    components: { Navbar, MediaDetailCard, MediaCarousel },
};
</script>
  
<style scoped>
.main {
    margin-top: 87px;
}
</style>
  