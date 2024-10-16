<script setup lang="ts">
import searchIconId from '../assets/img/sprite/Search.svg';
import genresIconId from '../assets/img/sprite/Genres.svg';
import userIconId from '../assets/img/sprite/HeaderUser.svg';

const userStore = useUserStore()
const modalStore = useModalStore()
const searchStore = useSeacrchStore()
const route = useRoute()

const isAccountPage = computed(() => {
  return route.name === 'account'
})

const changeModal = () => {
  modalStore.isOpenLoginAndRegistration = true
}

const onSearchBtn = () => {
  searchStore.isSearchVisible = true
  searchStore.isFocus = true
}
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <NuxtLink :to="'/'" class="logo header__logo">
        <img class="logo__img" src="/assets/img/Logo.svg" alt="CinemaGuide">
      </NuxtLink>
      <NavListLink class="header__nav" />
      <NuxtLink class="header__btn-mobail" :to="'/genres'" aria-label="Жанры">
        <svg class="header__btn-mobail-icon">
          <use :xlink:href="`#${genresIconId}`" />
        </svg>
      </NuxtLink>
      <SearchInput v-show="searchStore.isSearchVisibleComputed" class="header__search" />
      <button @click="onSearchBtn" class="btn-reset header__search-btn" aria-label="Поиск фильмов">
        <svg class="header__search-icon">
          <use :xlink:href="`#${searchIconId}`" />
        </svg>
      </button>
      <NuxtLink v-if="userStore.isAuth" :to="'/account'"
        :class="['btn-reset', 'text', 'text_white', 'navigation-link', 'header__btn', { 'active': isAccountPage }]"
        aria-label="В профиль">
        {{ userStore.user.name }}
      </NuxtLink>
      <button v-else @click="changeModal" class="btn-reset text text_white navigation-link header__btn">Войти</button>
      <NuxtLink v-if="userStore.isAuth" :to="'/account'" class="header__btn-mobail" aria-label="В профиль">
        <svg class="header__btn-mobail-icon">
          <use :xlink:href="`#${userIconId}`" />
        </svg>
      </NuxtLink>
      <button v-else @click="changeModal" class="btn-reset header__btn-mobail" aria-label="Войти">
        <svg class="header__btn-mobail-icon">
          <use :xlink:href="`#${userIconId}`" />
        </svg>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  padding: 24px 0 20px;
  width: 100%;
  background-color: $black-op-5;
  backdrop-filter: blur(10px);
  z-index: 100;

  &__container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__logo {
    flex-shrink: 0;
    margin-right: 70px;
  }

  &__logo,
  &__btn-mobail,
  &__search-btn {
    -webkit-tap-highlight-color: $transparent;
  }

  &__nav {
    margin-right: 26px;
    padding: 10px 0 10px 0;
    min-width: 216px;
  }

  &__btn-mobail {
    display: none;
  }

  &__search {
    margin-right: 69px;
    min-width: 200px;
  }

  &__search-btn {
    flex-shrink: 0;
    display: none;
    margin-right: 26px;
  }

  &__search-btn,
  &__search-icon {
    width: 24px;
    height: 24px;
  }

  &__search-icon {
    fill: $white;
    transition: fill .3s ease-in-out;
  }

  &__search-btn:focus-visible:not(:active) &__search-icon {
    fill: $melrose;
  }
}

.logo {
  display: block;
  font-size: 0;
}

@media (any-hover: hover) {
  .header {
    &__search-btn:hover:not(:focus-visible):not(:active) &__search-icon {
      fill: $melrose;
    }
  }
}

@media (max-width: 1439.98px) {
  .header {
    &__logo {
      margin-right: auto;
    }

    &__search {
      margin-right: 0;
    }

    &__search-btn {
      display: block;
    }
  }
}

@media (max-width: 1023.98px) {
  .header {
    padding: 16px 0;

    &__container {
      gap: 20px;
    }

    &__logo {
      display: block;
      width: 136px;
      height: 18px;
    }

    &__nav,
    &__btn {
      display: none;
    }

    &__btn-mobail {
      display: block;
      font-size: 0;
    }

    &__btn-mobail,
    &__btn-mobail-icon {
      width: 24px;
      height: 24px;
    }

    &__search-btn {
      margin-right: 0;
    }
  }
}
</style>
