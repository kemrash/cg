<script setup lang="ts">
import type { NoticeModal } from '~/types/Type';

defineProps<{ notice: NoticeModal }>()
const emits = defineEmits(['onClick'])

const onClick = () => {
  emits('onClick')
}
</script>

<template>
  <div class="notice">
    <h2 class="text-reset text text_bold text_black-dark notice__title">
      {{ notice.title }}
    </h2>
    <p class="text-reset text text_small text_black-dark notice__text">
      {{ notice.text }}
    </p>
    <button @click="onClick"
      class="btn-reset text text_btn text_small text_white text_bold btn btn_blue-marguerite notice__btn">
      {{ notice.textBtn }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.notice {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__title,
  &__text {
    text-align: center;
  }
}
</style>