<script setup lang="ts">
import type { NoticeModal } from '~/types/Type';

const noticeText = ref<NoticeModal>({
  title: 'Произошла ошибка',
  text: 'Пожалуйста, попробуйте ещё раз',
  textBtn: 'Войти'
})

const emits = defineEmits(['onClick'])

const onClick = () => {
  emits('onClick')
}
</script>

<template>
  <NoticeModal :notice="noticeText" @onClick="onClick" />
</template>

<style lang="scss" scoped></style>
