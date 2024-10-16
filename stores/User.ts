import { getProfile } from "~/api/User";
import type { User } from "~/types/Type";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const defaultUser = {
      name: "",
      surname: "",
      email: "",
      favorites: [],
    };

    const user = ref<User>(structuredClone(defaultUser));
    const isAuth = computed(() => user.value.email !== "");

    return {
      getUser: async (): Promise<void> => {
        await getProfile()
          .then((data) => {
            user.value = data;
          })
          .catch(() => {
            user.value = structuredClone(defaultUser);
          });
      },
      clearUser: (): void => {
        user.value = structuredClone(defaultUser);
      },
      isMovieInFavorites: (id: string) => {
        return user.value.favorites.some((item: string) => item === id);
      },
      user,
      isAuth,
    };
  },
  { persist: true }
);
