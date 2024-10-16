<script setup lang="ts">
const moviesStore = useMoviesStore()
moviesStore.clearGenreMovies()

await useAsyncData('genres', async () => await Promise.all([moviesStore.getGenres()]))

const genres = computed(() => moviesStore.genres)
</script>

<template>
  <section class="genres">
    <div class="container genres__container">
      <h1 class="text-reset text text_big text_bold genres__title">Жанры фильмов</h1>
      <UnorderedList class="genres__list">
        <li v-for="genre in genres" :key="genre" class="genres__item">
          <GenreCard :genre="genre" />
        </li>
      </UnorderedList>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.genres {
  padding: 162px 0 160px;

  &__title {
    margin-bottom: 61px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 62px 40px;
  }
}

@media (max-width: 1023.98px) {
  .genres {
    padding: 84px 0 40px;

    &__list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media (max-width: 767.98px) {
  .genres {
    &__title {
      margin-bottom: 39px;
    }

    &__list {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
  }
}

@media (max-width: 624.98px) {
  .genres {
    &__list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
