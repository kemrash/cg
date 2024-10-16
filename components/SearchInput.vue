<script setup lang="ts">
import searchIconId from '../assets/img/sprite/Search.svg';
import closeIconId from '../assets/img/sprite/Close.svg';
import { getOnWindowResize } from '~/composables/WindowUtils';

const TIMEOUT = 500
const MAX_WIDTH_MOBILE = 1440

let timer: ReturnType<typeof setTimeout>

const moviesStore = useMoviesStore()
const searchStore = useSeacrchStore()
const searchInput = ref()
const { windowWidth } = getOnWindowResize()
const isVizibleCloseBtn = computed(() => searchStore.input ? true : false || searchStore.isFullHeaderMode)
const isMoviesSearch = computed(() => moviesStore.searchMovies && moviesStore.searchMovies.length > 0)

const toMovieClick = () => {
  searchStore.input = ''
  moviesStore.searchMovies = []

  if (searchStore.isFullHeaderMode) {
    searchStore.isSearchVisible = false
  }
}

const clearInput = () => {
  searchStore.input = ''
  searchStore.isFocus = false

  if (searchStore.isFullHeaderMode) {
    searchStore.isSearchVisible = false
  }
}

watch(() => searchStore.input, () => {
  clearTimeout(timer)
  timer = setTimeout(async () => {
    if (searchStore.input.length > 0) {
      await moviesStore.getSearchMovie(searchStore.input.trim())
    } else {
      moviesStore.searchMovies = []
    }
  }, TIMEOUT)
})

watch(windowWidth, () => {
  if (windowWidth.value >= MAX_WIDTH_MOBILE) {
    searchStore.isSearchVisible = true
    searchStore.isFullHeaderMode = false
  } else {
    searchStore.isSearchVisible = false
    searchStore.isFullHeaderMode = true
  }
})

watch(() => searchStore.isFocus, () => {
  if (searchStore.isFocus && windowWidth.value < MAX_WIDTH_MOBILE) {
    nextTick(() => {
      searchInput.value.focus();
    });
  }
})
</script>

<template>
  <label class="search" aria-live="polite">
    <input v-model="searchStore.input" ref="searchInput" class="search__input" id="search" type="search" name="search"
      placeholder="Поиск" autocomplete="off">
    <svg class="search__icon">
      <use :xlink:href="`#${searchIconId}`" />
    </svg>
    <button v-if="isVizibleCloseBtn" @click="clearInput" class="btn-reset close-btn search__close-btn"
      aria-label="Очистить поиск">
      <svg class="close-btn__icon search__close-icon">
        <use :xlink:href="`#${closeIconId}`" />
      </svg>
    </button>
    <Transition>
      <UnorderedList v-if="isMoviesSearch" class="search__list">
        <li v-for="movie in moviesStore.searchMovies" class="search__item">
          <SearchMovie :movie="movie" @onClick="toMovieClick" />
        </li>
      </UnorderedList>
    </Transition>
  </label>
</template>

<style lang="scss" scoped>
.search {
  position: relative;
  max-width: 559px;
  width: 100%;

  &__input {
    padding: 0 52px;
    border: 1px solid transparent;
    border-radius: 8px;
    width: 100%;
    height: 48px;
    color: $white;
    background-color: $cape-cod;
    transition: border-color .3s ease-in-out;

    &::placeholder {
      font-size: $small;
      color: $white-op-5;
    }

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }

    &:focus {
      border-color: $melrose;

      &+.search__icon {
        fill: $melrose;
      }
    }
  }

  &__icon,
  &__close-btn {
    position: absolute;
    top: 12px;
  }

  &__icon {
    left: 16px;
  }

  &__icon,
  &__close-btn,
  &__close-icon {
    width: 24px;
    height: 24px;
  }

  &__icon,
  &__close-icon {
    fill: $white-op-5;
  }

  &__close-icon {
    -webkit-tap-highlight-color: $transparent;
  }

  &__close-btn {
    right: 16px;
  }

  &__list {
    position: absolute;
    left: 0;
    top: calc(100% + 22px);
    right: 0;
    border-radius: 0 0 8px 8px;
    max-height: 80vh;
    background-color: $cape-cod;
    overflow-y: auto;
  }

  &__item {
    padding: 0 8px;
  }
}

@media (any-hover: hover) {
  .search {
    &__input {
      &:hover {
        border-color: $melrose;

        &+.search__icon {
          fill: $melrose;
        }
      }
    }
  }
}

@media (max-width: 1439.98px) {
  .search {
    position: absolute;
    top: 0;
    left: 0;
    max-width: unset;
    width: 100%;
    height: 100vh;
    padding: 16px 50px;
    background-color: $black-op-5;

    &__input {
      height: 56px;
    }

    &__icon {
      left: 66px;
    }

    &__close-btn {
      right: 66px;
    }

    &__icon,
    &__close-btn {
      top: 32px;
    }

    &__list {
      position: static;
      margin-top: 8px;
      border-radius: 8px;
      max-height: 60vh;
    }
  }

}

@media (max-width: 767.98px) {
  .search {
    padding: 16px 20px;

    &__icon {
      left: 36px;
    }

    &__close-btn {
      right: 35px;
    }

    &__list {
      display: flex;
      column-gap: 17px;
      padding: 24px 20px;
      max-height: unset;
      overflow-x: auto;
    }

    &__item {
      flex-shrink: 0;
      padding: 0;
      max-width: 220px;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
</style>
