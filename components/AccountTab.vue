<script setup lang="ts">
import mailIconId from '../assets/img/sprite/Mail.svg';
import { getInitials } from '~/utils/TextUtils';
import type { User } from '~/types/Type';

const props = defineProps<{ user: User }>()
const emits = defineEmits(['clickLogOutBtn'])

const onClick = (): void => {
  emits('clickLogOutBtn')
}

const initials = computed(() => getInitials(props.user.name, props.user.surname))
</script>

<template>
  <UnorderedList class="account-tab">
    <li class="account-tab__item">
      <div class="text text_bold account-tab__left">{{ initials }}</div>
      <div class="account-tab__right">
        <span class="text text_small account-tab__desc">Имя Фамилия</span>
        <span class="text text_bold account-tab__text">{{ user.name }} {{ user.surname }}</span>
      </div>
    </li>
    <li class="account-tab__item">
      <div class="text text_bold account-tab__left account-tab__left_icon">
        <svg class="account-tab__icon">
          <use :xlink:href="`#${mailIconId}`" />
        </svg>
      </div>
      <div class="account-tab__right">
        <span class="text text_small account-tab__desc">Электронная почта</span>
        <span class="text text_bold account-tab__text">{{ user.email }}</span>
      </div>
    </li>
  </UnorderedList>
  <button @click="onClick"
    class="btn-reset text text_btn text_small text_white text_bold btn btn_blue-marguerite account__btn">
    Выйти из аккаунта
  </button>
</template>

<style lang="scss" scoped>
.account-tab {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 62px;

  &__item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  &__icon {
    width: 24px;
    height: 24px;
    fill: $white;
  }

  &__left {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    padding: 14px;
    background-color: $white-op-5;

    &_icon {
      padding: 18px;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}

@media (max-width: 767.98px) {
  .account-tab {
    margin-bottom: 41px;

    &__left {
      padding: 7px;

      &_icon {
        padding: 12px;
      }
    }

    &__desc {
      font-size: $mobail-small;
      color: $white-op-5;
    }

    &__text {
      font-size: $mobail-normal;
    }
  }
}

@media (max-width: 424.98px) {
  .account {
    &__btn {
      width: 100%;
    }
  }
}
</style>
