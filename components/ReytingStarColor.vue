<script setup lang="ts">
const excellentReyting = 8
const goodReyting = 7
const poorReyting = 5

const props = withDefaults(defineProps<{ reyting: number }>(), { reyting: 0 })
const setColorClassComputed = computed(() => {
  if (props.reyting >= excellentReyting) {
    return 'reyting-color_excellent'
  } else if (props.reyting >= goodReyting) {
    return 'reyting-color_good'
  } else if (props.reyting >= poorReyting) {
    return 'reyting-color_poor'
  } else {
    return 'reyting-color_bullshit'
  }
})
</script>

<template>
  <span :class="['reyting-color', setColorClassComputed]">{{ reyting }}</span>
</template>

<style lang="scss" scoped>
.reyting-color {
  display: inline-block;
  padding: 4px 12px 4px 33px;
  border-radius: 16px;
  font-weight: 700;
  color: $white;
  background-image: url('../assets/img/Star.svg');
  background-position: 12px 8px;
  background-repeat: no-repeat;

  &_excellent {
    background-color: $pirate-gold;
  }

  &_good {
    background-color: $forest-green;
  }

  &_poor {
    background-color: $boulder;
  }

  &_bullshit {
    background-color: $thunderbird;
  }
}
</style>
