export type Movie = {
  id: number;
  title: string;
  originalTitle: string;
  language: string;
  releaseYear: number;
  releaseDate: string;
  genres: string[];
  plot: string;
  runtime: number;
  budget: string;
  revenue: string;
  homepage: string;
  status: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  trailerYouTubeId: string;
  tmdbRating: number;
  searchL: string;
  keywords: string[];
  countriesOfOrigin: string[];
  languages: string[];
  cast: string[];
  director: string;
  production: string;
  awardsSummary: string;
};

export type AboutItem = {
  point: string;
  desc: string | number | string[];
};

export type User = {
  name: string;
  surname: string;
  email: string;
  favorites: string[];
};

export type RegistrationUser = {
  email: string;
  password: string;
  name: string;
  surname: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type StatusModal = "login" | "registration" | "success" | "error";

export type Label = {
  type: string;
  name: string;
  placeholder: string;
  icon: string;
  value: string;
  flagActiveValidation: boolean;
  error: ComputedRef<string>;
  serverError?: string;
};

export type Labels = {
  [key: string]: Label;
};

export type UserKey = keyof (LoginUser & RegistrationUser);

export type RegistrationData = { success?: string; error?: string };

export type Data = { result?: string };

export type NoticeModal = {
  title: string;
  text: string;
  textBtn: string;
};

export type Video = {
  id: string;
  title: string;
};

export type FooterLinks = {
  icon: string;
  href: string;
  title: string;
}[];

export type Vm = {
  isALLValidation: boolean;
  labels: Labels;
  onSubmit: () => void;
};
