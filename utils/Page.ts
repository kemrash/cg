export const pageNotFound = (): void => {
  throw createError({
    statusCode: 404,
    message: "Page not found",
  });
};
