import createSvgSpritePlugin from "vite-plugin-svg-sprite";
import { imagetools } from "vite-imagetools";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/style/_var.scss" as *;',
        },
      },
    },
    plugins: [
      createSvgSpritePlugin({
        symbolId: "icon-[name]-[hash]",
        include: ["**/assets/img/sprite/**.svg"],
      }),
      imagetools({
        defaultDirectives: () =>
          new URLSearchParams({
            format: "webp",
          }),
      }),
    ],
  },
  css: ["~/assets/style/style.scss"],
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxt/test-utils/module",
  ],
});
