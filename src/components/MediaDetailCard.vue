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
                    <h5 v-if="!ricercaGenere(media.genres.map(genere => genere.name))" class="card-title"
                        style="font-size: xx-large; text-align: center;">
                        {{ media.title || media.name }}
                    </h5>
                    <h5 v-else class="card-title" style="font-size: xx-large; text-align: center;">
                        {{ media.title || media.name }} <i class="bi bi-arrow-through-heart-fill"></i>
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
                    <p style="font-weight: bold;">{{
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
        pulisciGeneri(generi) {
            return Object.values(generi);
        },
        ricercaGenere(g) {
            const generiPuliti = this.pulisciGeneri(this.$store.state.genere);

            console.log('Generi Puliti:', generiPuliti);
            console.log('Generi del Media:', g);

            return g.some(genere => generiPuliti.includes(genere));
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
  