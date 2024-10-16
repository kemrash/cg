<script setup lang="ts">
import type { Movie } from '~/types/Type';
import noImage from '../assets/img/NoImage.png';
import deleteIconId from '../assets/img/sprite/Close.svg';
import { deleteFavorites } from '~/api/Favorites';

const modalStore = useModalStore()
const moviesStore = useMoviesStore()
const spinnerStore = useSpinnerStore()

const props = defineProps<{ movie: Movie, index?: number, isFavorite?: boolean }>()
const onActive = ref(false)

const isHoverFilmCard = computed(() => {
  return props.isFavorite && onActive.value
})

const onMouseEnter = (): void => {
  onActive.value = true
}

const onMouseleave = (): void => {
  onActive.value = false
}

const onDelete = async () => {
  spinnerStore.isSpinner = true

  const data = await deleteFavorites(String(props.movie.id)).catch(() => {
    modalStore.isOpenError = true
  })

  if (data) {
    await moviesStore.setFavorites()
  }

  spinnerStore.isSpinner = false
}
</script>

<template>
  <article @mouseenter="onMouseEnter" @mouseleave="onMouseleave" class="film-card">
    <img :src="movie.posterUrl || noImage" class="film-card__img" :alt="movie.title">
    <NuxtLink class="film-card__link" :to="`/movie/${props.movie.id}`">
      <h3 class="visually-hidden">{{ movie.title }}</h3>
    </NuxtLink>
    <div v-if="index" class="text text_bold text_blue-marguerite film-card__reiting"><span
        class="visually-hidden">Позиция в рейтинге</span>{{ index }}</div>
    <button v-if="isFavorite" @click="onDelete" @focus="onMouseEnter" @blur="onMouseleave"
      :class="['btn-reset', 'close-btn', 'film-card__btn', { 'film-card__btn_active': isHoverFilmCard }]"
      :aria-label="`Удалить ${movie.title} из избранного`">
      <svg class="close-btn__icon film-card__delete-icon">
        <use :xlink:href="`#${deleteIconId}`" />
      </svg>
    </button>
  </article>
</template>

<style lang="scss" scoped>
.film-card {
  position: relative;
  border: 1px solid $white-op-2;
  border-radius: 16px;
  max-width: 224px;
  height: 100%;
  background-color: $mine-shaft;
  box-shadow: 0px 0px 80px 0px $white-op-3;

  &__img {
    display: block;
    border-radius: 16px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__link {
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 1px solid transparent;
      border-radius: 16px;
      transition: border-color 0.3s ease-in-out;
    }

    &:focus-visible::after {
      border-color: $white;
    }
  }

  &__reiting {
    position: absolute;
    top: -12px;
    left: -12px;
    padding: 9px 25px 8px 24px;
    border-radius: 50px;
    background-color: $white;
  }

  &__btn {
    position: absolute;
    top: -21px;
    right: -21px;
    padding: 8px 8px 4px;
    border-radius: 100%;
    background-color: $white;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    -webkit-tap-highlight-color: $transparent;

    &_active {
      opacity: 1;
    }
  }

  &__delete-icon {
    width: 24px;
    height: 24px;
    fill: $black-dark;
  }
}

@media (any-hover: hover) {
  .film-card {
    &__link {
      &:hover:not(:focus-visible):not(:active):after {
        border-color: $white;
      }
    }
  }
}

@media (hover: none) and (pointer: coarse) {
  .film-card {
    &__btn {
      opacity: 1;
    }
  }
}
</style>
