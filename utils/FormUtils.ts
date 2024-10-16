import { capitalizeFirstLetter } from "#imports";
import type {
  Label,
  Labels,
  LoginUser,
  RegistrationUser,
  UserKey,
} from "~/types/Type";

export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};

export const isValidWord = (text: string): boolean => {
  const regex = /^[а-яА-ЯёЁ]+$/;

  return regex.test(text);
};

export const isValidPassword = (password: string): boolean => {
  const regex = /^\S{6,}$/;

  return regex.test(password);
};

export const validationInput = (
  label: Label,
  isValid: boolean,
  text: string
): string => {
  if (!label.value && label.flagActiveValidation) {
    return "Поле обязательно для заполнения.";
  }

  if (label.value && !isValid && label.flagActiveValidation) {
    return text;
  }

  return "";
};

export const setUser = (
  labels: Labels
): Partial<LoginUser & RegistrationUser> => {
  const user: Partial<LoginUser & RegistrationUser> = {};

  for (const index in labels) {
    if (index !== "passwordSecond") {
      if (index === "name" || index === "surname") {
        user[index as UserKey] = capitalizeFirstLetter(
          labels[index].value.trim()
        );
      } else {
        user[index as UserKey] = labels[index].value.trim();
      }
    }
  }

  return user;
};
