<script setup lang="ts">
const route = useRoute()

const isHomeOrFilmsPage = computed(() => {
  return route.name === 'index' || route.name === 'movie-id'
})
const isGenresOrGenrePage = computed(() => {
  return route.name === 'genres' || route.name === 'genres-id'
})
</script>

<template>
  <nav class="nav">
    <UnorderedList class="text-rubber nav__list">
      <li class="nav__item">
        <NuxtLink :to="'/'"
          :class="['text', 'text_white', 'navigation-link', 'nav__link', { 'active': isHomeOrFilmsPage }]">
          Главная
        </NuxtLink>
      </li>
      <li class="nav__item">
        <NuxtLink :to="'/genres'"
          :class="['text', 'text_white', 'navigation-link', 'nav__link', { 'active': isGenresOrGenrePage }]">
          Жанры
        </NuxtLink>
      </li>
    </UnorderedList>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 40px;
  }
}
</style>
