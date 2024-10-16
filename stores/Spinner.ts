export const useSpinnerStore = defineStore("spinnerStore", () => {
  const isSpinner = ref(false);

  return {
    isSpinner,
  };
});
