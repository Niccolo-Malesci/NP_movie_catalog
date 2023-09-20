<template>
    <div class="main">
        <Navbar @language-change="toggleLanguage" />
        <MediaDetailCard :media="movie" />
        <MediaCarousel :chunkedRecommendedMedia="chunkedRecommendedMovies" :currentSlideIndex="currentSlideIndex"
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
            chunkedRecommendedMovies: [],
            currentSlideIndex: 0,
            chunkSize: 5,
        };
    },
    async created() {
        await this.fetchGetMovie();
    },
    computed: {
        currentChunkRecommendedMovies() {
            return this.chunkedRecommendedMovies[this.currentSlideIndex] || [];
        },
    },
    watch: {
        "$route.params": {
            handler({ id } = {}) {
                if (!id) return;
                this.fetchGetMovie();
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        async fetchGetMovie() {
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
                    this.chunkedRecommendedMovies = this.chunkArray(this.recommendedMovies, this.chunkSize);
                })
                .catch(error => console.error('Errore durante il recupero dei film consigliati:', error));
        },

        chunkArray(array, size) {
            const chunkedArray = [];
            for (let i = 0; i < array.length; i += size) {
                chunkedArray.push(array.slice(i, i + size));
            }
            return chunkedArray;
        },
        toggleLanguage() {
            this.language = this.language === 'en' ? 'it' : 'en';
            this.fetchGetMovie();
            this.$i18n.locale = this.language;
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
  