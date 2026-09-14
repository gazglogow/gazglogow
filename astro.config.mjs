import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gazglogow.pl',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
