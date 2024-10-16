<script setup lang="ts">
import { testAuthUserAndReturnUserStore } from '~/composables/User';

testAuthUserAndReturnUserStore()

definePageMeta({
  title: 'Жанры',
})
</script>

<template>
  <GenresSection />
</template>

<style lang="scss" scoped></style>
