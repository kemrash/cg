import type { Movie, AboutItem } from "~/types/Type";
import { normalizeLanguageName, formatCurrency } from "~/utils/TextUtils";

export const useAboutStore = defineStore("aboutStore", () => {
  const aboutItems = ref<AboutItem[]>([
    {
      point: "Язык оригинала",
      desc: "language",
    },
    {
      point: "Бюджет",
      desc: "budget",
    },
    {
      point: "Выручка",
      desc: "revenue",
    },
    {
      point: "Режиссёр",
      desc: "director",
    },
    {
      point: "Продакшен",
      desc: "production",
    },
    {
      point: "Награды",
      desc: "awardsSummary",
    },
  ]);

  const movie = ref(undefined as Movie | undefined);

  const items = computed(() => {
    const sortItems = [];

    for (const item of aboutItems.value) {
      let moviePoint = movie.value?.[item.desc as keyof Movie];

      if (moviePoint) {
        if (item.desc === "language") {
          moviePoint = normalizeLanguageName(moviePoint as string);
        }

        if (item.desc === "budget" || item.desc === "revenue") {
          moviePoint = formatCurrency(moviePoint as number);
        }

        sortItems.push({
          point: item.point,
          desc: moviePoint,
        });
      }
    }

    return sortItems;
  });

  return {
    setMovie: (newMovie: Movie | undefined) => {
      movie.value = newMovie;
    },
    items,
  };
});
