<script setup lang="ts"></script>

<template>
  <UnorderedList class="movies-list">
    <slot />
  </UnorderedList>
</template>

<style lang="scss" scoped>
.movies-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 65px 40px;
}

@media (max-width: 1439.98px) {
  .movies-list {
    grid-template-columns: repeat(4, 1fr)
  }
}

@media (max-width: 1023.98px) {
  .movies-list {
    grid-template-columns: repeat(3, 1fr)
  }
}

@media (max-width: 767.98px) {
  .movies-list {
    display: flex;
    margin: 0 -20px;
    padding: 32px 20px;
    overflow-x: auto;
  }
}
</style>
