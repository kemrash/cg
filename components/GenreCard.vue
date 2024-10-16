<script setup lang="ts">
import noImage from "../assets/img/NoImage.png";
import { images } from '~/utils/Images';

const props = withDefaults(defineProps<{ genre: string }>(), { genre: 'Нет жанра' });
const imgComputed = computed(() => {
  return images[props.genre as keyof typeof images];
})
</script>

<template>
  <article class="genre-card">
    <img :src="imgComputed || noImage" class="genre-card__img" :alt="genre" aria-hidden="true">
    <NuxtLink class="genre-card__link" :to="`/genres/${genre}`">
      <h3 class="text-reset text text_bold text_white genre-card__text">{{ genre }}</h3>
    </NuxtLink>
  </article>
</template>

<style lang="scss" scoped>
.genre-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 24px;
  border: 1px solid $white-op-2;
  height: 100%;
  background-color: $dove-gray;
  box-shadow: 0px 0px 80px 0px $white-op-3;
  overflow: hidden;

  &__link {
    flex: 1;
    display: block;
    padding: 25px 10px 28px;
    text-align: center;
    background-color: $black;
    -webkit-tap-highlight-color: $transparent;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 1px solid transparent;
      border-radius: 24px;
      transition: border-color .3s ease-in-out;
    }

    &:focus-visible:not(:active)::after {
      border-color: $white;
    }
  }

  &__img {
    display: block;
    object-fit: cover;
    height: 218px;
  }
}

@media (any-hover: hover) {
  .genre-card {
    &__link {
      &:hover:not(:focus-visible):not(:active)::after {
        border-color: $white;
      }
    }
  }
}
</style>
