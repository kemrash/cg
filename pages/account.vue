<script setup lang="ts">
import { testAuthUserAndReturnUserStore } from '~/composables/User';


const { userStore } = testAuthUserAndReturnUserStore()

watch(() => userStore.isAuth, async () => {
  if (!userStore.isAuth) {
    await navigateTo('/')
  }
}, { immediate: true })

definePageMeta({
  title: 'Мой аккаунт',
})
</script>

<template>
  <AccountSection v-if="userStore.isAuth" />
</template>

<style scoped></style>
