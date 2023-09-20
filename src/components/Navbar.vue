<template>
  <nav class="navbar navbar-expand-lg bg-dark navbar">
    <div class="container-fluid" style="width: max-content;">
      <router-link to="/catalogo/film" class="navbar-link"
        style="color: red; font-family: fantasy; font-size: xx-large; width: max-content; text-decoration: none;"
        @click="goToHomePage">
        {{ $t('appTitle') }}
      </router-link>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <button @click="linkFilm"
            :class="{ red: currentRoute === '/catalogo/film', white: currentRoute !== '/catalogo/film' }"
            class="nav-link white">Film</button>
        </li>
        <li class="nav-item">
          <button @click="linkTv"
            :class="{ red: currentRoute === '/catalogo/tv', white: currentRoute !== '/catalogo/tv' }"
            class="nav-link">Serie-TV</button>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
            style="color: white;"> {{ $t('language') }}</a>
          <ul class="dropdown-menu">
            <li style="display: inline-block;" margin-right ><a class="dropdown-item" href="#"><button @click="toggleLanguage">{{ currentLanguage === 'it' ?
              'English' : 'Italian' }}</button></a></li>
          </ul>
        </li>
      </ul>
    </div>
    <form class="d-flex" role="search">
      <input v-model="searchQuery" @input="handleSearchInput" :placeholder="$t('searchPlaceholder')"
        class="search-input" />
    </form>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      currentLanguage: 'it',
      searchQuery: '',
    };
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    }
  },
  methods: {
    linkFilm() {
      this.$router.push('/catalogo/film');
    },
    linkTv() {
      this.$router.push('/catalogo/tv');
    },
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'en' ? 'it' : 'en';
      this.$i18n.locale = this.currentLanguage;
      this.$emit('language-change', this.currentLanguage);
    },
    handleSearchInput() {
      console.log("Ricerca in corso con query:", this.searchQuery);
      if (this.searchQuery.length >= 2) {
        this.$emit('search', this.searchQuery);
      }
      if (this.searchQuery.length === 0) {
        this.$emit('search', '');
      }
    },
    goToHomePage() {
      this.$router.push({ path: '/catalogo/film' });
    },
  },
};
</script>
  
<style scoped>
button.white {
  color: white;
}

button.red {
  color: red;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.expand-button {
  color: white;
}

.expand-button:hover {
  text-decoration: underline;
  cursor: pointer;
  color: blueviolet;
}

.pagination-buttons {
  margin-top: 20px;
  text-align: center;
}

.pagination-button {
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.search-input {
  margin-bottom: 20px;
  padding: 10px;
  font-size: 18px;
  width: 87%;
  border: none;
  border-radius: 5px;
}

button.active {
  background-color: #e50914;
  font-weight: bold;
  color: #fff;
}
</style>
  