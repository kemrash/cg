<script setup lang="ts">
const moviesStore = useMoviesStore()
const spinnerStore = useSpinnerStore()

spinnerStore.isSpinner = true
await moviesStore.setFavorites()
spinnerStore.isSpinner = false

const movies = computed(() => moviesStore.favorites || [])
</script>

<template>
  <ClientOnly>
    <MoviesList v-if="movies.length > 0" class="favorite-tab">
      <TransitionGroup>
        <li v-for="movie in movies" :key="movie.id" class="favorite-tab__item">
          <FilmCard :movie="movie" :isFavorite="true" />
        </li>
      </TransitionGroup>
    </MoviesList>
  </ClientOnly>
</template>

<style lang="scss" scoped>
@media (max-width: 767.98px) {
  .favorite-tab {
    &__item {
      flex-shrink: 0;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: transform .3s ease-in-out, opacity .3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
