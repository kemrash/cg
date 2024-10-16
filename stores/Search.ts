export const useSeacrchStore = defineStore("searchStore", () => {
  const input = ref("");
  const isSearchVisible = ref(false);
  const isFocus = ref(false);
  const isFullHeaderMode = ref(false);

  const isSearchVisibleComputed = computed(() => {
    return isSearchVisible.value || input.value.length > 0;
  });

  return {
    input,
    isSearchVisible,
    isFocus,
    isFullHeaderMode,
    isSearchVisibleComputed,
  };
});
