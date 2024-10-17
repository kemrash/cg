<script setup lang="ts">
import { pageNotFound } from '~/utils/Page';
import { testAuthUserAndReturnUserStore } from '~/composables/User';

testAuthUserAndReturnUserStore()

const route = useRoute()
const moviesStore = useMoviesStore()

const id = computed(() => `${route.params.id}`)

await useAsyncData('genreMovies', async () => {
  moviesStore.clearGenreMovies()

  return await Promise.all([moviesStore.getGenreMovies(id.value)])
})

const movies = computed(() => moviesStore.genreMovies || [])
const isMovies = computed(() => movies.value.length > 0)

if (!isMovies.value) {
  pageNotFound()
}

useHead({
  title: `CinemaGuide - ${id.value}`,
})
</script>

<template>
  <GenreSection v-if="isMovies" :genre="id" :movies="movies" />
</template>

<style lang="scss" scoped></style>
