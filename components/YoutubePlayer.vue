<script setup lang="ts">
import pauseIconId from '../assets/img/sprite/Pause.svg';
import playIconId from '../assets/img/sprite/Play.svg';
import spinnerIconId from '../assets/img/sprite/Spinner.svg';
import type { Video } from '~/types/Type';

declare const YT: any;

const PATH_URL = 'https://www.youtube.com/iframe_api'
const player = ref<typeof YT.Player | null>(null);
const isPause = ref(false)
const isShowPlay = ref(false)
const isLoadWaiting = ref(true)
const props = defineProps<{ video: Video }>()
const emits = defineEmits(['play', 'pause', 'ended'])

const initializePlayer = (): void => {
  player.value = new YT.Player('player', {
    videoId: props.video.id,
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      fs: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

const onPlayerReady = (): void => {
  isLoadWaiting.value = false
};

const onPlayerStateChange = (event: typeof YT): void => {
  switch (event.data) {
    case YT.PlayerState.PAUSED:
      isPause.value = true
      emits('pause')
      break;
    case YT.PlayerState.PLAYING:
      isPause.value = false
      isShowPlay.value = false
      emits('play')
      break;
    case YT.PlayerState.ENDED:
      emits('ended')
      break;
  }
};

onMounted(() => {
  if (window.YT && window.YT.Player) {
    initializePlayer();
  } else {
    const tag = document.createElement('script');
    tag.src = PATH_URL;

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = initializePlayer;
  }
});

onUnmounted(() => {
  if (player.value) {
    player.value.destroy();
    player.value = null;
  }
});

const showPlay = (flag: boolean): void => {
  if (isPause.value) {
    isShowPlay.value = flag
  }
}
</script>

<template>
  <div class="youtube">
    <div @mouseenter="showPlay(true)" @mouseleave="showPlay(false)"
      :class="['youtube__box', { 'youtube__box_show': !isLoadWaiting }]">
      <div id="player" class="youtube__player"></div>
    </div>
    <svg v-if="isLoadWaiting" class="youtube__spinner">
      <use :xlink:href="`#${spinnerIconId}`" />
    </svg>
    <svg v-if="isPause" class="youtube__icon">
      <use v-if="!isShowPlay" :xlink:href="`#${pauseIconId}`" />
      <use v-if="isShowPlay" :xlink:href="`#${playIconId}`" />
    </svg>
    <div class="youtube__inner">
      <p v-if="isPause" class="text-reset text text_bold youtube__title">
        {{ video.title }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.youtube {
  position: relative;
  border: 1px solid $white-op-5;
  background-color: $cape-cod;

  &,
  &__box {
    width: 100%;
    height: 100%;
  }

  &__box {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    &_show {
      opacity: 1;
    }
  }

  &__icon,
  &__spinner {
    position: absolute;
    pointer-events: none;
  }

  &__icon {
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
    transform: translate(-50%, -50%);
  }

  &__spinner {
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    width: 40px;
    height: 40px;
    transform: translate(calc(50% - 20px), calc(50% - 20px));
    animation: spin 1s linear infinite;
  }

  &__inner {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: end;
    padding: 24px;
    pointer-events: none;
  }

  &__title {
    padding: 24px 40px;
    width: 100%;
    background-color: $gray-op-5;
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

@media (max-width: 1199.98px) {
  .youtube {
    border: none;

    &__icon {
      width: 64px;
      height: 64px;
    }

    &__inner {
      padding: 0;
    }

    &__title {
      font-size: $mobail-normal;
    }
  }
}

@media (max-width: 1199.98px) and (orientation: portrait) {
  .youtube {
    &__inner {
      position: static;
    }
  }
}
</style>
