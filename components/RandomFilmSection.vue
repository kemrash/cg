<script setup lang="ts">
const moviesStore = useMoviesStore()
const spinnerStore = useSpinnerStore()

await useAsyncData('randomMovie', async () => await Promise.all([moviesStore.getRandomMovie()]))

const randomMovie = computed(() => moviesStore.randomMovie)

const getRandomMovie = async () => {
  spinnerStore.isSpinner = true
  await moviesStore.getRandomMovie()

  if (!moviesStore.randomMovie.backdropUrl) {
    spinnerStore.isSpinner = false
  }
}
</script>

<template>
  <section class="random-film">
    <MoviePresentation :movie="randomMovie" :isRandomMovie="true" @clickRandomMovie="getRandomMovie" />
  </section>
</template>

<style lang="scss" scoped></style>
