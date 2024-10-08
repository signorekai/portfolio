import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentIntellisense: true
  },
  integrations: [tailwind({
    applyBaseStyles: false,
    nesting: true
  }), alpinejs({
    entrypoint: '/src/entrypoint'
  })],
});