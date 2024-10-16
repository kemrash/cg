<script setup lang="ts">
import heartIconId from '../assets/img/sprite/Heart.svg';
import heartFavoriteIconId from '../assets/img/sprite/HeartFavorite.svg';
import circleIconId from '../assets/img/sprite/Circle.svg';
import { calculateDuration } from '~/utils/TextUtils';
import { addFavorites, deleteFavorites } from '~/api/Favorites'
import type { Movie } from '~/types/Type';

const userStore = useUserStore()
const modalStore = useModalStore()
const spinnerStore = useSpinnerStore()
const props = defineProps<{ movie: Movie | undefined, isRandomMovie?: boolean }>()
const emit = defineEmits(['clickRandomMovie'])
const isOnMounted = ref(false)

const isMovieInFavorites = computed(() => {
  return !userStore.isAuth ? false : userStore.isMovieInFavorites(String(props.movie?.id))
})

onMounted(() => {
  isOnMounted.value = true
})

const duration = computed(() => {
  return calculateDuration(props.movie?.runtime)
})

const getRandomMovie = () => {
  emit('clickRandomMovie')
}

const onClickFavoriteBtn = async () => {
  if (!userStore.isAuth) {
    modalStore.isOpenLoginAndRegistration = true

    return
  }

  spinnerStore.isSpinner = true

  if (!isMovieInFavorites.value) {
    await addFavorites(String(props.movie?.id)).catch(() => {
      modalStore.isOpenError = true
    })
    await userStore.getUser()
  } else {
    await deleteFavorites(String(props.movie?.id)).catch(() => {
      modalStore.isOpenError = true
    })
    await userStore.getUser()
  }

  spinnerStore.isSpinner = false
}

const onClickTrailerBtn = () => {
  modalStore.isOpenMovie = true
  modalStore.openMovie = {
    id: props.movie?.trailerYouTubeId as string,
    title: props.movie?.title as string
  }
}
</script>

<template>
  <div class="movie-presentation">
    <div class="container movie-presentation__container">
      <div class="movie-presentation__wrap">
        <div class="movie-presentation__inner">
          <span class="visually-hidden">Рейтинг</span>
          <ReytingStarColor class="movie-presentation__reyting" :reyting="movie?.tmdbRating" />
          <span class="visually-hidden">Год</span>
          <span class="movie-presentation__text">{{ movie?.releaseYear }}</span>
          <span class="visually-hidden">Жанр</span>
          <span v-for="genre in movie?.genres" class="movie-presentation__text">{{ genre }}</span>
          <span class="visually-hidden">Длительность</span>
          <span class="movie-presentation__text">{{ duration }}</span>
        </div>
        <h2 v-if="isRandomMovie" class="text-reset text text_big text_bold movie-presentation__title">
          {{ movie?.title }}
        </h2>
        <h1 v-else class="text-reset text text_big text_bold movie-presentation__title">{{ movie?.title }}</h1>
        <p class="text-reset text text_white-op-7 movie-presentation__desc">{{ movie?.plot }}</p>
        <div class="movie-presentation__box">
          <button @click="onClickTrailerBtn"
            class="btn-reset text text_btn text_small text_white text_bold btn btn_blue-marguerite movie-presentation__btn movie-presentation__btn_trailer"
            :class="{ 'movie-presentation__btn_w-100': isRandomMovie }">
            Трейлер
          </button>
          <NuxtLink :to="`/movie/${movie?.id}`" v-if="isRandomMovie"
            class="btn-reset text text_btn text_small text_white text_bold btn btn_cape-cod movie-presentation__link">
            О&nbsp;фильме
          </NuxtLink>
          <button @click="onClickFavoriteBtn" class="btn-reset btn btn_cape-cod btn_short movie-presentation__btn"
            :aria-label="isMovieInFavorites ? 'Удалить из избранного' : 'Добавить в избранное'">
            <svg class="movie-presentation__icon">
              <use v-if="isOnMounted && isMovieInFavorites" :xlink:href="`#${heartFavoriteIconId}`" />
              <use v-else :xlink:href="`#${heartIconId}`" />
            </svg>
          </button>
          <button v-if="isRandomMovie" @click="getRandomMovie"
            class="btn-reset btn btn_cape-cod btn_short movie-presentation__btn" aria-label="Новый случайный фильм">
            <svg class="movie-presentation__icon">
              <use :xlink:href="`#${circleIconId}`" />
            </svg>
          </button>
        </div>
      </div>
      <div class="movie-presentation__gradient">
        <img v-if="movie?.backdropUrl" class="movie-presentation__img" :src="movie.backdropUrl" alt=""
          aria-hidden="true">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie-presentation {
  padding: 202px 0 145px;
  position: relative;

  &__gradient {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    max-width: 900px;
    z-index: -1;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.50)20.41%, rgba(0, 0, 0, 0.00)100%);
      pointer-events: none;
    }
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__wrap {
    max-width: 50%;
  }

  &__inner {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 16px;
    margin-bottom: 17px;
    font-size: $small;
    line-height: 24px;
    color: $white-op-7;
  }

  &__title {
    margin-bottom: 17px;
  }

  &__desc {
    margin-bottom: 58px;
  }

  &__box {
    display: flex;
    flex-wrap: wrap;
    gap: 16.5px;
  }

  &__link {
    display: block;
  }

  &__link,
  &__btn {
    &:focus-visible:not(:active):not(:disabled) .movie-presentation__icon {
      fill: $black-dark;
    }
  }

  &__btn {
    -webkit-tap-highlight-color: $transparent;
  }

  &__icon {
    width: 24px;
    height: 24px;
    fill: $white;
    transition: fill 0.3s ease-in-out;
  }
}

@media (any-hover: hover) {
  .movie-presentation {

    &__link,
    &__btn {
      &:hover:not(:focus-visible):not(:active):not(:disabled) .movie-presentation__icon {
        fill: $black-dark;
      }
    }
  }
}

@media (max-width: 1439.98px) {
  .movie-presentation {
    &__wrap {
      max-width: 60%;
    }
  }
}

@media (max-width: 1023.98px) {
  .movie-presentation {
    padding: 56px 0 24px;

    &__container {
      display: flex;
      flex-direction: column-reverse;
      gap: 24px;
    }

    &__wrap {
      max-width: 100%;
    }

    &__gradient {
      position: static;
      margin: 0 -50px;
      max-width: unset;
      width: calc(100% + 100px);

      &::after {
        background: none;
      }
    }

    &__img {
      min-height: 260px;
    }
  }
}

@media (max-width: 767.98px) {
  .movie-presentation {
    &__text {
      font-size: $mobail-small;
    }

    &__title {
      font-size: $mobail-big;
    }

    &__desc {
      margin-bottom: 33px;
      font-size: $mobail-normal;
    }

    &__btn {
      &_w-100 {
        width: 100%;
      }

      &_trailer {
        padding: 16px 88px;
      }
    }

    &__box {
      gap: 16px 18px;
    }

    &__link {
      padding: 16px 37px 16px 40px;
    }

    &__gradient {
      margin: 0 -20px;
      width: calc(100% + 40px);
    }
  }
}
</style>
