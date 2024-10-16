<script setup lang="ts">
import type { Movie } from '~/types/Type';

defineProps<{ movie: Movie | undefined }>()
</script>

<template>
  <section class="movie">
    <MoviePresentation :movie="movie" />
  </section>
</template>

<style lang="scss" scoped></style>
