export const capitalizeFirstLetter = (text: string): string => {
  return text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase();
};

export const normalizeLanguageName = (text: string): string => {
  const normalLanguage = new Intl.DisplayNames(["ru"], {
    type: "language",
  }).of(text);

  return normalLanguage ? capitalizeFirstLetter(normalLanguage) : text;
};

export const formatCurrency = (value: number): string => {
  const formattedNumber = new Intl.NumberFormat("ru-RU").format(value);

  return `${formattedNumber} руб.`;
};

export const calculateDuration = (duration: number = 0): string => {
  if (duration > 0) {
    const minutes = duration;
    return `${Math.floor(minutes / 60)} ч ${minutes % 60} мин`;
  } else {
    return "Длительность неизвестна";
  }
};

export const translateText = (text: string): string => {
  if (text === "User already exists") {
    return "Пользователь с тикам email уже существует";
  }

  return text;
};

export const getInitials = (name: string, surname: string): string => {
  const initialName = name.slice(0, 1).toUpperCase();
  const initialSurname = surname.slice(0, 1).toUpperCase();

  return `${initialName}${initialSurname}`;
};

export const passwordErrorText =
  "Пароль не может содержать пробелы и быть короче 6 символов.";

export const emailErrorText = "Некорректная электронная почта.";

export const nameErrorText = "Одно слово на русском языке.";

export const passwordErrorTextMustMatch = " Пароли должны совпадать.";
