<script setup lang="ts">
const moviesStore = useMoviesStore()

await useAsyncData('top10', async () => await Promise.all([moviesStore.getTop10()]))

const top10Movies = computed(() => moviesStore.top10 || [])
</script>

<template>
  <section class="top-films">
    <div class="container top-films__container">
      <h2 class="text-reset text text_large text_white text_bold top-films__title">Топ 10 фильмов</h2>
      <MoviesList v-if="top10Movies.length > 0" class="top-films__list">
        <li v-for="movie, index in top10Movies" :key="movie.id" class="top-films__item">
          <FilmCard :movie="movie" :index="index + 1" />
        </li>
      </MoviesList>
      <span v-else class="top-films__text">Список пуст</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.top-films {
  padding: 18px 0 120px;

  &__title {
    margin-bottom: 63px;
    letter-spacing: -1px;
  }

  &__item {
    height: 336px;
  }
}

@media (max-width: 767.98px) {
  .top-films {
    padding: 35px 0 0;

    &__title {
      margin-bottom: 7px;
    }

    &__item {
      flex-shrink: 0;
    }
  }
}
</style>
