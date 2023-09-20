<template>
    <div class="main">
        <Navbar @language-change="toggleLanguage" />
        <MediaDetailCard :media="tvShow" />
        <MediaCarousel :chunkedRecommendedMedia="chunkedRecommendedTvShows" :currentSlideIndex="currentSlideIndex"
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
            chunkedRecommendedTvShows: [],
            currentSlideIndex: 0,
            chunkSize: 5,
        };
    },
    async created() {
        await this.fetchGetTvShow();
    },
    computed: {
        currentChunkRecommendedTvShows() {
            return this.chunkedRecommendedTvShows[this.currentSlideIndex] || [];
        },
    },
    watch: {
        "$route.params": {
            handler({ id } = {}) {
                if (!id) return;
                this.fetchGetTvShow();
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        async fetchGetTvShow() {
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
                    this.chunkedRecommendedTvShows = this.chunkArray(this.recommendedTvShows, this.chunkSize);
                })
                .catch(error => console.error('Errore durante il recupero delle serie TV consigliate:', error));
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
            this.fetchGetTvShow();
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
  