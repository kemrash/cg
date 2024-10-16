<script setup lang="ts">
import spinnerIconId from '../assets/img/sprite/Spinner.svg';

const preventDefaultTab = (event: KeyboardEvent): void => {
  if (event.key === 'Tab') {
    event.preventDefault()
  }
}

onMounted(() => {
  document.addEventListener('keydown', preventDefaultTab)
})

onUnmounted(() => {
  document.removeEventListener('keydown', preventDefaultTab)
})
</script>

<template>
  <div class="spinner" aria-live="polite">
    <span class="visually-hidden">Загрузка</span>
    <svg class="spinner__icon">
      <use :xlink:href="`#${spinnerIconId}`" />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: $black-op-5;
  z-index: 9999;

  &__icon {
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
