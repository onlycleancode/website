import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://yourusername.github.io',
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [
    pagefind(),
  ],
});
