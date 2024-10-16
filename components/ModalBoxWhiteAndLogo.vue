<script setup lang="ts"></script>

<template>
  <div class="box-white">
    <img class="box-white__logo" src="/assets/img/Logo.svg" alt="CinemaGuide">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.box-white {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 40px;
  border-radius: 24px;
  width: 420px;
  background-color: $white;

  &__logo {
    display: block;
    width: 180px;
    height: 24px;
    margin-bottom: 40px;
  }
}

@media (max-width: 767.98px) {
  .box-white {
    padding: 64px 19px 32px;
    width: 100%;

    &__logo {
      margin-bottom: 31px;
    }
  }
}
</style>
