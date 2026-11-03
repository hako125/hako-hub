// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Used to build absolute canonical / OG URLs in BlogLayout.
  site: 'https://www.adityaalok.dev',
  vite: {
    plugins: [tailwindcss()]
  }
});