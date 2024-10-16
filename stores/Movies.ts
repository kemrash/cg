import { useFetch } from "~/api/Fetch";
import { getFavorites } from "~/api/Favorites";
import type { Movie } from "~/types/Type";

export const useMoviesStore = defineStore("moviesStore", () => {
  const top10 = ref(undefined as Movie[] | undefined);
  const randomMovie = ref(undefined as Movie | undefined);
  const genres = ref(undefined as string[] | undefined);
  const genreMovies = ref(undefined as Movie[] | undefined);
  const movie = ref(undefined as Movie | undefined);
  const searchMovies = ref(undefined as Movie[] | undefined);
  const favorites = ref(undefined as Movie[] | undefined);

  return {
    getTop10: async (): Promise<void> => {
      top10.value = await useFetch("/top10");
    },
    getRandomMovie: async (): Promise<void> => {
      randomMovie.value = await useFetch("/random");
    },
    getGenres: async (): Promise<void> => {
      genres.value = await useFetch("/genres");
    },
    getGenreMovies: async (
      genre: string,
      page: number = 0,
      count: number = 10
    ): Promise<void> => {
      genreMovies.value = [
        ...(genreMovies.value || []),
        ...((await useFetch(`?count=${count}&page=${page}&genre=${genre}`)) ||
          []),
      ];
    },
    clearGenreMovies: (): void => {
      genreMovies.value = [];
    },
    getMovie: async (id: string): Promise<void> => {
      movie.value = await useFetch(`/${id}`);
    },
    getSearchMovie: async (value: string): Promise<void> => {
      searchMovies.value = await useFetch(`?count=5&title=${value}`);
    },
    setFavorites: async (): Promise<void> => {
      await getFavorites()
        .then((data) => (favorites.value = data as Movie[]))
        .catch(() => {
          favorites.value = [];
        });
    },
    top10,
    randomMovie,
    genres,
    genreMovies,
    movie,
    searchMovies,
    favorites,
  };
});
