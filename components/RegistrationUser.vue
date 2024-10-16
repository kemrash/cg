<script setup lang="ts">
import type { Labels, RegistrationUser } from "~/types/Type";
import mailIconId from "../assets/img/sprite/Mail.svg";
import userIconId from "../assets/img/sprite/User.svg";
import keyIconId from "../assets/img/sprite/Key.svg";
import {
  isValidEmail,
  isValidPassword,
  isValidWord,
  validationInput,
  setUser,
} from "~/utils/FormUtils";
import { translateText } from "~/utils/TextUtils";
import { registration } from "~/api/User";
import { passwordErrorText, emailErrorText, nameErrorText, passwordErrorTextMustMatch } from "~/utils/TextUtils";

const spinnerStore = useSpinnerStore()

const labels = ref<Labels>({
  email: {
    type: "email",
    name: "email",
    placeholder: "Электронная почта",
    icon: mailIconId,
    value: "",
    flagActiveValidation: false,
    error: computed((): string => {
      let errorText = validationInput(
        labels.value.email,
        isValidEmail(labels.value.email.value),
        emailErrorText
      );

      if (labels.value.email.serverError) {
        errorText = labels.value.email.serverError
      }

      return errorText
    }),
    serverError: "",
  },
  name: {
    type: "text",
    name: "name",
    placeholder: "Имя",
    icon: userIconId,
    value: "",
    flagActiveValidation: false,
    error: computed((): string => {
      return validationInput(
        labels.value.name,
        isValidWord(labels.value.name.value),
        nameErrorText
      );
    }),
  },
  surname: {
    type: "text",
    name: "surname",
    placeholder: "Фамилия",
    icon: userIconId,
    value: "",
    flagActiveValidation: false,
    error: computed((): string => {
      return validationInput(
        labels.value.surname,
        isValidWord(labels.value.surname.value),
        nameErrorText
      );
    }),
  },
  password: {
    type: "password",
    name: "password",
    placeholder: "Пароль",
    icon: keyIconId,
    value: "",
    flagActiveValidation: false,
    error: computed((): string => {
      let errorText = validationInput(
        labels.value.password,
        isValidPassword(labels.value.password.value),
        passwordErrorText
      );

      if (labels.value.password.value !== labels.value.passwordSecond.value) {
        errorText += passwordErrorTextMustMatch
      }

      return errorText
    }),
  },
  passwordSecond: {
    type: "password",
    name: "passwordSecond",
    placeholder: "Подтвердите пароль",
    icon: keyIconId,
    value: "",
    flagActiveValidation: false,
    error: computed((): string => {
      let errorText = validationInput(
        labels.value.passwordSecond,
        isValidPassword(labels.value.passwordSecond.value),
        passwordErrorText
      );

      if (labels.value.password.value !== labels.value.passwordSecond.value) {
        errorText += passwordErrorTextMustMatch
      }

      return errorText
    }),
  },
});

const btn = {
  text: "Создать аккаунт",
};

const isALLValidation = computed((): boolean => {
  return !labels.value.email.error &&
    labels.value.email.value &&
    !labels.value.name.error &&
    labels.value.name.value &&
    !labels.value.surname.error &&
    labels.value.surname.value &&
    !labels.value.password.error &&
    labels.value.password.value &&
    !labels.value.passwordSecond.error &&
    labels.value.passwordSecond.value
    ? true
    : false;
});

const emits = defineEmits(['success', 'error'])

const onSubmit = async () => {
  if (isALLValidation.value) {
    const user = setUser(labels.value);

    spinnerStore.isSpinner = true

    try {
      const data = await registration(user as RegistrationUser)

      if (data.error) {
        labels.value.email.serverError = translateText(data.error)
      } else if (data.success) {
        emits('success')
      } else {
        throw new Error('Error registration user')
      }
    } catch {
      emits('error')
    }

    spinnerStore.isSpinner = false
  }
}
</script>

<template>
  <h2 class="visually-hidden" id="id-group-label">Форма регистрации</h2>
  <FormWithButton :labels="labels" :textBtn="btn.text" :isDisabledBtn="isALLValidation" @submit="onSubmit"
    aria-labelledby="id-group-label" />
</template>

<style lang="scss" scoped></style>
