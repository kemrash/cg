<script setup lang="ts">
import closeIconId from '../assets/img/sprite/CloseBig.svg';
import { getOnWindowResize } from '~/composables/WindowUtils';
import { setFocusHtmlElementFromClassName } from '~/utils/HtmlUtils';
import type { Video } from '~/types/Type';

const STANDART_VIDEO_WIDTH = 960
const STANDART_VIDEO_HEIGHT = 540
const COEFFICIENT = STANDART_VIDEO_WIDTH / STANDART_VIDEO_HEIGHT
const MAX_DESCTOP_WIDTH = 1199
const PADDING = 70

const defaultVideo: Video = {
  id: '1ttBXGq72_g',
  title: 'Вся алгебра (математика) 7 класс за 1 час 90 минут.',
}

const modalStore = useModalStore()
const isShowCloseBtn = ref(true)
const { windowWidth, windowHeight } = getOnWindowResize()
const emit = defineEmits(['closeModal'])

const wrapperStyle = computed(() => {
  if (windowWidth.value > MAX_DESCTOP_WIDTH) {
    return {
      width: `${STANDART_VIDEO_WIDTH + PADDING * 2}px`,
      height: `${STANDART_VIDEO_HEIGHT}px`,
      paddingLeft: `${PADDING}px`,
      paddingRight: `${PADDING}px`,
    }
  } else {
    let height = windowWidth.value / COEFFICIENT

    if (height > windowHeight.value) {
      height = windowHeight.value
    }

    return {
      width: '100%',
      height: `${height}px`,
      paddingLeft: '0',
      paddingRight: '0',
    }
  }
})

const closeModal = (): void => {
  emit('closeModal')
}

const onPause = (): void => {
  isShowCloseBtn.value = true
}

const onPlay = (): void => {
  isShowCloseBtn.value = false
}

nextTick(() => {
  setFocusHtmlElementFromClassName('youtube-modal__player')
})
</script>

<template>
  <div class="youtube-modal">
    <div class="youtube-modal__wrapper" :style="wrapperStyle">
      <h2 class="visually-hidden">Показ трейлера</h2>
      <YoutubePlayer :video="modalStore.openMovie || defaultVideo" @ended="closeModal" @pause="onPause" @play="onPlay"
        class="youtube-modal__player" tabindex="0" />
      <button @click="closeModal"
        :class="['btn-reset', 'close-btn', 'youtube-modal__close-btn', { 'youtube-modal__close-btn_show': isShowCloseBtn }]"
        aria-label="Закрыть">
        <svg class="close-btn__icon youtube-modal__close-icon">
          <use :xlink:href="`#${closeIconId}`" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.youtube-modal {
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
  }

  &__close-btn {
    position: absolute;
    top: 0px;
    right: -2px;
    padding: 12px 12px 8px;
    border-radius: 100%;
    background-color: $white;
    fill: $black-dark;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    -webkit-tap-highlight-color: $transparent;

    &:focus-visible,
    &_show {
      opacity: 1;
    }
  }

  &__close-icon {
    width: 24px;
    height: 24px;
    fill: $black-dark;
  }
}

@media (max-width: 1199.98px) {
  .youtube-modal {
    padding: 0;
    background-color: $black-dark;

    &__close-btn {
      top: 7px;
      right: 8px;
      padding: 5px 4px 1px;
    }
  }
}
</style>
