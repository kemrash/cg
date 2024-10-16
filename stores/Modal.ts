import type { Video } from "~/types/Type";

export const useModalStore = defineStore("modalStore", () => {
  const isOpenError = ref(false);
  const isOpenLoginAndRegistration = ref(false);
  const isOpenMovie = ref(false);
  const openMovie = ref<Video>();

  return {
    isOpenError,
    isOpenLoginAndRegistration,
    isOpenMovie,
    openMovie,
  };
});
