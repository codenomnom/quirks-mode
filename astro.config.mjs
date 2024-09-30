// @ts-check
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';


// import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://quirks-mode.com',
  integrations: [// tailwind(),
  sitemap(), icon()]
});
