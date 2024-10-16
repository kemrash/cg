export const getOnWindowResize = (): {
  windowWidth: Ref<number>;
  windowHeight: Ref<number>;
} => {
  const windowWidth = ref(0);
  const windowHeight = ref(0);

  const onWindowResize = () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  };

  onMounted(() => {
    onWindowResize();
    window.addEventListener("resize", onWindowResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onWindowResize);
  });

  return {
    windowWidth,
    windowHeight,
  };
};

export const getWindowScroll = (): { x: Ref<number>; y: Ref<number> } => {
  const x = ref(0);
  const y = ref(0);

  const onWindowScroll = () => {
    x.value = window.scrollX;
    y.value = window.scrollY;
  };

  onMounted(() => {
    onWindowScroll();
    window.addEventListener("scroll", onWindowScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onWindowScroll);
  });

  return {
    x,
    y,
  };
};
