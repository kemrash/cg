<script setup lang="ts">
import { pageNotFound } from '~/utils/Page';
import { testAuthUserAndReturnUserStore } from '~/composables/User';

testAuthUserAndReturnUserStore()

const route = useRoute()
const moviesStore = useMoviesStore()
const id = computed(() => `${route.params.id}`)

await useAsyncData('movie', async () => await Promise.all([moviesStore.getMovie(id.value)]))

const movie = computed(() => moviesStore.movie)
const isMovie = computed(() => movie.value?.id)

if (!isMovie.value) {
  pageNotFound()
}

useHead({
  title: `CinemaGuide - ${movie.value?.title || 'фильм'}`,
})
</script>

<template v-if="isMovie">
  <MovieSection :movie="movie" />
  <AboutMovieSection :movie="movie" />
</template>

<style lang="scss" scoped></style>
