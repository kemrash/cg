<script setup lang="ts">
import heartIconId from '../assets/img/sprite/Heart.svg';
import userIconId from '../assets/img/sprite/User.svg';
import { logout } from '~/api/User';
import { getOnWindowResize } from '#imports';

const navigationButtons = [
  {
    title: 'Избранные фильмы',
    titleMobail: 'Избранное',
    img: `#${heartIconId}`,
    tabId: 'movies',
  },
  {
    title: 'Настройка аккаунта',
    titleMobail: 'Настройки',
    img: `#${userIconId}`,
    tabId: 'user',
  }
]

const userStore = useUserStore()
const activeTab = ref('movies')
const { windowWidth } = getOnWindowResize()

const changeTab = (tab: string): void => {
  activeTab.value = tab
}

const logOutUser = async (): Promise<void> => {
  logout()
  userStore.clearUser()
}
</script>

<template>
  <section class="account">
    <div class="container account__container">
      <h1 class="text-reset text text_big text_bold account__title">
        Мой аккаунт
      </h1>
      <UnorderedList class="account__list">
        <li v-for="item in navigationButtons" class="account__item">
          <button
            :class="['btn-reset', 'text', 'text_white', 'navigation-link', 'account__btn', { 'account__btn_active': activeTab === item.tabId }]"
            @click="changeTab(item.tabId)">
            <svg class="account__icon">
              <use :xlink:href="item.img" />
            </svg>
            {{ windowWidth > 767 ? item.title : item.titleMobail }}
          </button>
        </li>
      </UnorderedList>
      <FavoriteTab v-if="activeTab === 'movies'" />
      <AccountTab v-if="activeTab === 'user'" :user="userStore.user" @clickLogOutBtn="logOutUser" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.account {
  padding: 162px 0 145px;

  &__title {
    margin-bottom: 70px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 55px;
    margin-bottom: 64px;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 7px;
    -webkit-tap-highlight-color: $transparent;

    &_active {
      border-bottom: 1.5px solid $heliotrope;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
    fill: $white;
  }
}

@media (max-width: 767.98px) {
  .account {
    padding: 83px 0 40px;

    &__title {
      margin-bottom: 49px;
    }

    &__list {
      gap: 24px;
      margin-bottom: 40px;
    }
  }
}
</style>
