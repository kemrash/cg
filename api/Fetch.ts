const PATH_URL = "https://cinemaguide.skillbox.cc/movie";

export const useFetch = async (params: string): Promise<undefined> => {
  return await $fetch(`${PATH_URL}${params}`);
};
