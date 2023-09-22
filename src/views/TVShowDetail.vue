<template>
    <div class="main">
        <Navbar @language-change="toggleLanguage" :currentLanguage="this.$store.state.currentLanguage" />
        <MediaDetailCard :media="tvShow" />
        <MediaCarousel :chunkedRecommendedMedia="chunkedRecommendedTvShows" :currentSlideIndex="currentSlideIndex"
            currentCategory="tv" />
        <div class="back-button">
            <router-link :to="{ name: 'catalogo-tv' }">
                <span class="icon">&#8592;</span> {{ $t('goBack') }}
            </router-link>
        </div>
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
            tvShow: {},
            recommendedTvShows: [],
            chunkedRecommendedTvShows: [],
            currentSlideIndex: 0,
            chunkSize: 5,
            savedScrollPosition: 0,
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
    mounted() {
        this.scrollToSavedPosition();
    },
    methods: {
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (vm.savedScrollPosition > 0) {
                    window.scrollTo(0, vm.savedScrollPosition);
                }
            });
        },
        saveScrollPosition() {
            this.savedScrollPosition = window.scrollY;
        },
        scrollToSavedPosition() {
            if (this.savedScrollPosition > 0) {
                window.scrollTo(0, this.savedScrollPosition);
            }
        },
        async fetchGetTvShow() {
            const tvShowId = this.$route.params.id;
            const tvShowUrl = `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${this.apiKey}&language=${this.$store.state.currentLanguage}`;
            const recommendedTvShowsUrl = `https://api.themoviedb.org/3/tv/${tvShowId}/recommendations?api_key=${this.apiKey}&language=${this.$store.state.currentLanguage}`;

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
            if (this.$store.state.currentLanguage == 'en') {
                this.$store.commit('setCurrentLanguage', 'it');
            }
            else {
                this.$store.commit('setCurrentLanguage', 'en');
            }
            this.fetchGetTvShow();
            this.$i18n.locale = this.$store.state.currentLanguage;
        },
    },
    components: { Navbar, MediaDetailCard, MediaCarousel },
};
</script>
  
<style scoped>
.main {
    margin-top: 87px;
}

.back-button {
    margin-top: 20px;
    text-align: center;
}

.icon {
    font-size: 24px;
    margin-right: 5px;
}
</style>
  