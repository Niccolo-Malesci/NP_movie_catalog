<template>
    <div class="carousel-container">
        <div class="carousel slide" :id="'myCarousel' + currentSlideIndex" data-bs-ride="carousel"
            v-if="currentSlideIndex < 4">
            <div class="carousel-indicators">
                <button type="button" :data-bs-target="'#myCarousel' + currentSlideIndex" data-bs-slide-to="0"
                    class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" :data-bs-target="'#myCarousel' + currentSlideIndex" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" :data-bs-target="'#myCarousel' + currentSlideIndex" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
                <button type="button" :data-bs-target="'#myCarousel' + currentSlideIndex" data-bs-slide-to="3"
                    aria-label="Slide 4"></button>
                <button type="button" :data-bs-target="'#myCarousel' + currentSlideIndex" data-bs-slide-to="4"
                    aria-label="Slide 5"></button>
            </div>
            <div class="carousel-inner" style="margin-left: 11%;">
                <div :class="['carousel-item', index === currentSlideIndex ? 'active' : '']"
                    v-for="(recommended, index) in chunkedRecommendedMedia" :key="index">
                    <div class="row" style="width: 95%;">
                        <router-link :to="'/dettaglio/' + currentCategory + '/' + recommended.id"
                            v-for="(media, mediaIndex) in recommended" :key="mediaIndex" class="col-md-2"
                            @click="fetchMediaDetails(media.id, currentCategory)">
                            <img :src="getMediaPosterUrl(media.poster_path)" class="d-block w-100" alt="Media Consigliato">
                        </router-link>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" :data-bs-target="'#myCarousel' + currentSlideIndex"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" :data-bs-target="'#myCarousel' + currentSlideIndex"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        chunkedRecommendedMedia: Array,
        currentSlideIndex: Number,
        currentCategory: String,
    },
    methods: {
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
        getMediaPosterUrl(media) {
            if (!media || !media.poster_path) {
                return '';
            }
            return `https://image.tmdb.org/t/p/original/${media.poster_path}`;
        },
    },
};
</script>
  
<style scoped>
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
}
</style>
  