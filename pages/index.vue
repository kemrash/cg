<script setup lang="ts">
import RandomFilmSection from '~/components/RandomFilmSection.vue';
import { testAuthUserAndReturnUserStore } from '~/composables/User';

testAuthUserAndReturnUserStore()

definePageMeta({
  title: 'Главная',
})
</script>

<template>
  <main class="main">
    <h1 class="visually-hidden">Онлайн-платформы CinemaGuide</h1>
    <RandomFilmSection />
    <TopFilmsSection />
  </main>
</template>

<style lang="scss" scoped></style>
