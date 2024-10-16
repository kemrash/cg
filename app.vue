<script setup lang="ts">
const route = useRoute()
const title = computed(() => `CinemaGuide - ${route.meta.title}`)

useHead({
  title,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss" scoped></style>