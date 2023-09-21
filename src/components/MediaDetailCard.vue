<template>
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
                    <h5 class="card-title" style="font-size: xx-large; text-align: center;">
                        {{ media.title || media.name }}
                    </h5>
                    <p class="card-text" style="font-weight: bold;">{{ media.tagline }}</p>
                    <p>{{ media.overview }}</p>
                    <p style="font-style: italic;">{{ $t('mediaDetails.productionCountries') }}: {{
                        getCountries(media.production_countries) }}</p>
                    <p style="font-style: italic;">{{ $t('mediaDetails.productionCompanies') }}: {{
                        getCompanies(media.production_companies) }}</p>
                    {{ $t('mediaDetails.rating') }}:
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
                    <p>{{ $t('mediaDetails.popularity') }}: {{ media.popularity }}</p>
                    <p v-if="!ricercaGenere(media.genres.map(genere => genere.name))" style="font-weight: bold;">{{
                        getGenres(media.genres) }}</p>
                    <p v-else style="font-weight: bold;">{{
                        getGenres(media.genres) }}</p>
                    <p v-if="media.title" class="card-text"
                        style="color: white; position: absolute; bottom: 0; right: 0; margin: 10px;">
                        {{ $t('mediaDetails.duration') }}: {{ media.runtime }} {{ $t('mediaDetails.minuts') }} <br> {{
                            $t('mediaDetails.dateOfPublication') }}: {{
        media.release_date }}
                    </p>
                    <p v-else class="card-text"
                        style="color: white; position: absolute; bottom: 0; right: 0; margin: 10px;">
                        {{ $t('mediaDetails.totalNumberOfEpisodes') }}: {{ media.number_of_episodes }} <br> {{
                            $t('mediaDetails.dateOfPublication') }}: {{ media.first_air_date }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        media: Object,
    },
    methods: {
        ricercaGenere(g) {
            const generi = this.$store.state.genere;

            for (let i = 0; i < generi.length; i++) {
                for (let j = 0; j < g.length; j++) {
                    if (g[j] == generi[i]) {
                        return true
                    }
                }
            }
            return false
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
  