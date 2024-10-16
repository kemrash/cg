<script setup lang="ts">
import chevronIconId from '../assets/img/sprite/Chevron.svg';
import { capitalizeFirstLetter } from '~/utils/TextUtils';
import { getOnWindowResize, getWindowScroll } from '~/composables/WindowUtils';
import type { Movie } from '~/types/Type';

const STEP_MOVIES = 1
const NUMBER_UPLOAD_MOVIES = 10

const moviesStore = useMoviesStore()
const dimensionHtmlStore = useDimensionHtmlStore()
const spinnerStore = useSpinnerStore()

const maxScroll = ref(0)
const countMoviesPage = ref(0)
const isNotMaxMovies = ref(true)
const props = defineProps<{ genre: string, movies: Movie[] }>()
const { windowWidth, windowHeight } = getOnWindowResize()
const { y } = getWindowScroll()

const genreTitle = computed(() => capitalizeFirstLetter(props.genre))

const moviesSort = computed(() => {
  if (props.movies.length === NUMBER_UPLOAD_MOVIES) {
    return props.movies.sort((a, b) => b.tmdbRating - a.tmdbRating)
  } else {
    return props.movies
  }
})

const getMaxScroll = (): void => {
  maxScroll.value = document.documentElement.scrollHeight - window.innerHeight - dimensionHtmlStore.footerHeight
}

const addMovies = async (): Promise<void> => {
  const maxMovies = props.movies.length
  countMoviesPage.value += STEP_MOVIES

  spinnerStore.isSpinner = true

  await moviesStore.getGenreMovies(props.genre, countMoviesPage.value, NUMBER_UPLOAD_MOVIES)

  nextTick(() => {
    if (countMoviesPage.value === maxMovies) {
      isNotMaxMovies.value = false
    }

    getMaxScroll()

    spinnerStore.isSpinner = false
  })
}

watch([windowWidth, windowHeight], () => {
  getMaxScroll()
})

watch(y, () => {
  if (y.value >= maxScroll.value && isNotMaxMovies.value) {
    addMovies()
  }
})
</script>

<template>
  <section class="genre">
    <div class="container">
      <NuxtLink class="genre__link" :to="`/genres/`">
        <h1 class="text-reset text text_big text_bold text_white genre__title">
          <svg class="genre__icon">
            <use :xlink:href="`#${chevronIconId}`" />
          </svg>
          {{ genreTitle }}
        </h1>
      </NuxtLink>
      <MoviesList v-if="movies.length > 0" class="genre__list">
        <li v-for="movie in moviesSort" :key="movie.id" class="genre__item">
          <FilmCard :movie="movie" />
        </li>
      </MoviesList>
      <span v-else class="genre__text">Список пуст</span>
      <div class="genre__wrap">
        <button v-if="movies.length > 0 && isNotMaxMovies" @click="addMovies"
          class="btn-reset text text_btn text_small text_white text_bold btn btn_blue-marguerite genre__btn">
          Показать ещё
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.genre {
  padding: 162px 0 160px;

  &__title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 18px;
    margin-bottom: 63px;
  }

  &__icon {
    width: 40px;
    height: 40px;
  }

  &__list {
    margin-bottom: 61px;
  }

  &__item {
    height: 336px;
  }

  &__wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
}

@media (max-width: 767.98px) {
  .genre {
    padding: 77px 0 40px;

    &__title {
      gap: 3px;
      margin-bottom: 35px;
    }

    &__list {
      flex-wrap: wrap;
      gap: 23px;
      margin: 0;
      margin-bottom: 40px;
      padding: 0;
    }

    &__item {
      width: calc((100% - 40px) / 2);

      & .film-card {
        max-width: unset;
      }
    }
  }
}

@media (max-width: 424.98px) {
  .genre {
    &__item {
      width: 100%;
      height: 502px;
    }

    &__btn {
      width: 100%;
    }
  }
}
</style>
