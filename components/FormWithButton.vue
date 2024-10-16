<script setup lang="ts">
import { setFocusHtmlElementFromClassName } from '~/utils/HtmlUtils';
import type { Labels, Label } from '~/types/Type';

defineProps<{ labels: Labels, textBtn: string, isDisabledBtn?: boolean }>()
const emits = defineEmits(['submit'])

const onSubmit = (event: Event) => {
  emits('submit', event)
}

const onInput = (label: Label) => {
  if (!label.flagActiveValidation) {
    label.flagActiveValidation = true
  }

  if (label?.serverError) {
    label.serverError = ''
  }
}

nextTick(() => {
  setFocusHtmlElementFromClassName('form__input')
})
</script>

<template>
  <fieldset class="fieldset-reset form">
    <form @submit.prevent="onSubmit" class="form__element" novalidate>
      <label v-for="label in labels" :key="label.name" class="form__label">
        <input v-model="label.value" @input="onInput(label)" :type="label.type" :name="label.name"
          :placeholder="label.placeholder"
          :class="['text', 'text_small', 'text_black-op-4', 'form__input', { 'form__input_error': String(label.error) !== '' }]">
        <svg class="form__icon">
          <use :xlink:href="`#${label.icon}`" />
        </svg>
        <p v-if="String(label.error) !== ''" class="text-reset form__error">
          {{ label.error }}
        </p>
      </label>
      <button :disabled="!isDisabledBtn" type="submit"
        class="btn-reset text text_btn text_small text_white text_bold btn btn_blue-marguerite form__btn">
        {{ textBtn }}
      </button>
    </form>
  </fieldset>
</template>

<style lang="scss" scoped>
.form {
  width: 100%;
  margin-bottom: 24px;

  &__element {
    display: flex;
    flex-direction: column;
  }

  &__label {
    position: relative;
    margin-bottom: 12px;
    border: 1px solid transparent;

    &:last-of-type {
      margin-bottom: 24px;
    }
  }

  &__input {
    padding: 0 20px 0 51px;
    border: 1px solid $black-op-4;
    border-radius: 8px;
    width: 100%;
    height: 56px;
    color: $black-dark;
    transition: border-color 0.3s ease-in-out;

    &::placeholder {
      color: $black-op-4;
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &_error {
      border-color: $bittersweet;

      &+.form__icon {
        fill: $bittersweet;
      }
    }

    &:focus {
      border-color: $melrose;

      &+.form__icon {
        fill: $melrose;
      }
    }
  }

  &__icon {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 24px;
    height: 24px;
    fill: $black-op-4;
  }

  &__error {
    color: $bittersweet;
  }
}

@media (any-hover: hover) {
  .form {
    &__input:hover {
      border-color: $melrose;

      &+.form__icon {
        fill: $melrose;
      }
    }
  }
}

@media (max-width: 767.98px) {
  .form {
    &__label {
      margin-bottom: 0px;

      &:last-of-type {
        margin-bottom: 13px;
      }
    }

    &__input {
      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }

    &__error {
      padding-bottom: 5px;
    }
  }
}
</style>
