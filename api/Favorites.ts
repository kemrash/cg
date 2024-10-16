import type { Movie, Data } from "~/types/Type";

const PATH_URL = "https://cinemaguide.skillbox.cc/favorites";

export const addFavorites = async (id: string): Promise<Data> => {
  const data = await $fetch(`${PATH_URL}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
    }),
  });

  return data as Data;
};

export const deleteFavorites = async (id: string): Promise<Data> => {
  const data = await $fetch(`${PATH_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return data as Data;
};

export const getFavorites = async (): Promise<Movie[] | Data> => {
  const data = await $fetch(`${PATH_URL}`, {
    credentials: "include",
  });

  return data as Movie[] | Data;
};
