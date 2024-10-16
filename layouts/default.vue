<script setup lang="ts">
const modalStore = useModalStore()
const spinnerStore = useSpinnerStore()

const changeModalError = () => {
  modalStore.isOpenError = !modalStore.isOpenError
}

const changeModalLoginAndRegistration = () => {
  modalStore.isOpenLoginAndRegistration = !modalStore.isOpenLoginAndRegistration
}

const changeModalMovie = () => {
  modalStore.isOpenMovie = !modalStore.isOpenMovie
}

watch([() => modalStore.isOpenError, () => modalStore.isOpenLoginAndRegistration, () => modalStore.isOpenMovie], () => {
  document.body?.classList.toggle('no-scroll')
})
</script>

<template>
  <ModalSpinner v-if="spinnerStore.isSpinner" />
  <Transition>
    <ModalDefault v-if="modalStore.isOpenError" @closeModal="changeModalError">
      <ModalBoxWhiteAndLogo>
        <ErrorModal @closeModal="changeModalError" />
      </ModalBoxWhiteAndLogo>
    </ModalDefault>
  </Transition>
  <Transition>
    <ModalDefault v-if="modalStore.isOpenLoginAndRegistration" @closeModal="changeModalLoginAndRegistration">
      <ModalBoxWhiteAndLogo>
        <LoginAndRegistration @closeModal="changeModalLoginAndRegistration" />
      </ModalBoxWhiteAndLogo>
    </ModalDefault>
  </Transition>
  <Transition>
    <YoutubeModal v-if="modalStore.isOpenMovie" @closeModal="changeModalMovie" />
  </Transition>
  <HeaderSection />
  <slot />
  <FooterSection />
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity .3s ease-in-out, transform .3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
