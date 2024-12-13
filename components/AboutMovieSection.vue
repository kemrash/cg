<script setup lang="ts">
import type { Movie } from '~/types/Type';

const props = defineProps<{ movie: Movie | undefined }>()
const aboutStore = useAboutStore()
aboutStore.setMovie(props.movie)
</script>

<template>
  <section class="about-movie">
    <div class="container about-movie__container">
      <h2 class="text-reset text text_large text_white text_bold about-movie__title">О фильме</h2>
      <UnorderedList v-if="aboutStore.items.length > 0" class="about-movie__list">
        <li v-for="item in aboutStore.items" :key="item.point" class="about-movie__item">
          <span class="text text_small about-movie__point">{{ item.point }}</span>
          <span class="text text_small about-movie__desc">{{ item.desc }}</span>
        </li>
      </UnorderedList>
      <span v-else>К сожалению, ничего не нашлось</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-movie {
  padding: 42px 0 120px;

  &__title {
    margin-bottom: 64px;
    letter-spacing: -1px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }

  &__item {
    display: flex;
    column-gap: 8px;
  }

  &__point {
    display: inline-flex;
    column-gap: 8px;
    max-width: 320px;
    width: 100%;

    &::after {
      content: '';
      flex-grow: 1;
      height: 1em;
      background-image: url('~/assets/img/Dot.webp');
      background-repeat: repeat-x;
      background-size: 5px 2px;
      background-position: left bottom;
    }
  }
}

@media (max-width: 767.98px) {
  .about-movie {
    padding: 35px 0 32px;

    &__title {
      margin-bottom: 39px;
    }

    &__list {
      row-gap: 12px;
    }

    &__item {
      flex-direction: column;
    }

    &__point {
      margin-bottom: 6px;
      font-size: $mobail-small;
      color: $white-op-5;

      &::after {
        background-image: none;
      }
    }
  }
}
</style>
