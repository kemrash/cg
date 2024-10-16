<script setup lang="ts">
import type { StatusModal } from '~/types/Type';

const status = ref<StatusModal>('login')

const isLogin = computed(() => status.value === 'login')
const isRegistration = computed(() => status.value === 'registration')
const isSuccess = computed(() => status.value === 'success')
const isError = computed(() => status.value === 'error')
const textBtn = computed(() => isLogin.value ? 'Регистрация' : 'У меня есть пароль')

const emits = defineEmits(['closeModal'])

const onClickChangeStatus = (): void => {
  isLogin.value ? status.value = 'registration' : status.value = 'login'
}

const onSuccess = (): void => {
  status.value = 'success'
}

const onError = (): void => {
  status.value = 'error'
}

const changeStatusOnLogin = (): void => {
  status.value = 'login'
}

const closeModal = () => {
  emits('closeModal')
}
</script>

<template>
  <LoginUser v-if="isLogin" @closeModal="closeModal" @error="onError" />
  <RegistrationUser v-if="isRegistration" @success="onSuccess" @error="onError" />
  <SuccessRegistration v-if="isSuccess" @onClick="changeStatusOnLogin" />
  <ErrorForm v-if="isError" @onClick="changeStatusOnLogin" />
  <button v-if="isLogin || isRegistration" @click="onClickChangeStatus"
    class="btn-reset text text_small text_bold navigation-link">
    {{ textBtn }}
  </button>
</template>

<style lang="scss" scoped></style>
