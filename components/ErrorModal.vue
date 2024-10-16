<script setup lang="ts">
import type { NoticeModal } from '~/types/Type';

const noticeText = ref<NoticeModal>({
  title: 'Произошла ошибка',
  text: 'Пожалуйста, попробуйте ещё раз',
  textBtn: 'Закрыть'
})

const emits = defineEmits(['closeModal'])

const onClick = () => {
  emits('closeModal')
}
</script>

<template>
  <NoticeModal :notice="noticeText" @onClick="onClick" />
</template>

<style lang="scss" scoped></style>
