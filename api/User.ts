import type {
  RegistrationUser,
  LoginUser,
  RegistrationData,
  Data,
  User,
} from "~/types/Type";

const PATH_URL = "https://cinemaguide.skillbox.cc/";

export const registration = async (
  user: RegistrationUser
): Promise<RegistrationData> => {
  const data = await $fetch(`${PATH_URL}user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).catch((error) => {
    if (error.response.status === 409) {
      return error.response._data;
    }

    throw error;
  });

  return data as RegistrationData;
};

export const login = async (user: LoginUser): Promise<Data> => {
  const data = await $fetch(`${PATH_URL}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include",
  });

  return data as Data;
};

export const logout = async (): Promise<Data> => {
  const data = await $fetch(`${PATH_URL}auth/logout`, {
    credentials: "include",
  });

  return data as Data;
};

export const getProfile = async (): Promise<User> => {
  const data = await $fetch(`${PATH_URL}profile`, {
    credentials: "include",
  });

  return data as User;
};
