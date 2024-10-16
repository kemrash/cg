<script setup lang="ts">
import type { Movie } from '~/types/Type';
import { calculateDuration } from '~/utils/TextUtils';

const props = defineProps<{ movie: Movie | undefined }>()
const emits = defineEmits(['onClick'])
const duration = computed(() => {
  return calculateDuration(props.movie?.runtime)
})

const onClick = () => {
  emits('onClick')
}
</script>

<template>
  <div v-if="movie" class="search-movie">
    <img :src="movie?.posterUrl" :alt="movie?.title" class="search-movie__img">
    <div class="search-movie__right">
      <div class="search-movie__top">
        <span class="visually-hidden">Рейтинг</span>
        <ReytingStarColor class="search-movie__reyting" :reyting="movie?.tmdbRating" />
        <span class="visually-hidden">Год</span>
        <span class="text text_small-sm text_white-op-7 search-movie__text">{{ movie?.releaseYear }}</span>
        <span class="visually-hidden">Жанр</span>
        <span v-for="genre in movie?.genres" class="text text_small-sm text_white-op-7 search-movie__text">
          {{ genre }}
        </span>
        <span class="visually-hidden">Длительность</span>
        <span class="text text_small-sm text_white-op-7 search-movie__text">{{ duration }}</span>
      </div>
      <NuxtLink @click="onClick" :to="`/movie/${movie?.id}`"
        class="text text_small text_bold text_white search-movie__link">
        {{ movie?.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-movie {
  position: relative;
  display: flex;
  gap: 16px;
  padding: 20px 8px;

  &__img {
    align-self: center;
    flex-shrink: 0;
    width: 40px;
    height: 52px;
    object-fit: cover;
  }

  &__right {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  &__top {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  & &__reyting {
    display: inline-block;
    padding: 4px 8px 1px 22px;
    border-radius: 16px;
    font-size: 12px;
    background-size: 10px 10px;
    background-position: 7px center;
  }

  &__text {
    line-height: 142.857%;
  }

  &__link {
    -webkit-tap-highlight-color: $transparent;

    &:focus-visible::after {
      border-color: $white-op-5;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 6px;
      border: 1px solid transparent;
      transition: border-color .3s ease-in-out;
    }
  }
}

@media (any-hover: hover) {
  .search-movie {
    &__link {
      &:hover:not(:focus-visible):not(:active)::after {
        border-color: $white-op-5;
      }
    }
  }
}

@media (max-width: 767.98px) {
  .search-movie {
    flex-direction: column;
    padding: 0;

    &__img {
      align-self: unset;
      width: 158px;
      height: 206px;
    }
  }
}
</style>
