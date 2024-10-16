<script setup lang="ts">
import closeIconId from '../assets/img/sprite/CloseBig.svg';

const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit('closeModal')
}
</script>

<template>
  <div class="modal">
    <div class="modal__wrapper">
      <slot />
      <button @click="closeModal" class="btn-reset close-btn modal__close-btn" aria-label="Закрыть">
        <svg class="close-btn__icon modal__close-icon">
          <use :xlink:href="`#${closeIconId}`" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 40px 0;
  width: 100%;
  height: 100vh;
  background-color: $black-op-5;
  z-index: 1000;
  overflow-y: auto;

  &__wrapper {
    position: relative;
    padding: 0 70px;
  }

  &__close-btn {
    position: absolute;
    top: 0px;
    right: -2px;
    padding: 12px 12px 8px;
    border-radius: 100%;
    background-color: $white;
    fill: $black-dark;
  }

  &__close-icon {
    width: 24px;
    height: 24px;
    fill: $black-dark;
  }
}

@media (max-width: 767.98px) {
  .modal {
    padding: 20px 0;

    &__wrapper {
      padding: 0 20px;
      width: 100%;
    }

    &__close-btn {
      top: 8px;
      right: 28px;
    }
  }
}
</style>
