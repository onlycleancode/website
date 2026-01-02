import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://joelmontano.com',
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [
    pagefind(),
  ],
});
