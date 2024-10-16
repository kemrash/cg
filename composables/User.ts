export const testAuthUserAndReturnUserStore = () => {
  const userStore = useUserStore();

  if (userStore.isAuth) {
    userStore.getUser();
  }

  return { userStore };
};
