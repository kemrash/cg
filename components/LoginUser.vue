<script setup lang="ts">
import type { Labels, LoginUser } from "~/types/Type";
import mailIconId from "../assets/img/sprite/Mail.svg";
import keyIconId from "../assets/img/sprite/Key.svg";
import {
  isValidEmail,
  isValidPassword,
  validationInput,
  setUser,
} from "~/utils/FormUtils";
import { passwordErrorText, emailErrorText } from "~/utils/TextUtils";
import { login } from "~/api/User";

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
        errorText = labels.value.email.serverError;
      }

      return errorText;
    }),
    serverError: "",
  },
  password: {
    type: "password",
    name: "password",
    placeholder: "Пароль",
    icon: keyIconId,
    value: "",
    flagActiveValidation: false,
    error: computed((): string => {
      return validationInput(
        labels.value.password,
        isValidPassword(labels.value.password.value),
        passwordErrorText
      );
    }),
  },
});

const btn = {
  text: "Войти",
};

const emits = defineEmits(['error', 'closeModal'])

const isALLValidation = computed((): boolean => {
  return !labels.value.email.error &&
    labels.value.email.value &&
    !labels.value.password.error &&
    labels.value.password.value
    ? true
    : false;
});

const onSubmit = async (): Promise<void> => {
  if (isALLValidation.value) {
    const user = setUser(labels.value);

    spinnerStore.isSpinner = true

    try {
      const data = await login(user as LoginUser)

      if (data.result) {
        const userStore = useUserStore()
        await userStore.getUser()

        emits('closeModal')
      } else {
        throw new Error('Error login user')
      }
    } catch {
      emits('error')
    }

    spinnerStore.isSpinner = false
  }
}
</script>

<template>
  <h2 class="visually-hidden" id="id-group-label">Форма входа</h2>
  <FormWithButton :labels="labels" :textBtn="btn.text" :isDisabledBtn="isALLValidation" @submit="onSubmit"
    aria-labelledby="id-group-label" />
</template>

<style lang="scss" scoped></style>
