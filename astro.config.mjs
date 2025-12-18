// @ts-check
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';


// import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://quirks-mode.com',
  prefetch: {
    defaultStrategy: 'load',
    prefetchAll: true,
  },
  markdown: {
    remarkRehype: {
      footnoteLabel: 'notes:',
      footnoteLabelTagName: 'h3',
      footnoteLabelProperties: { className: ['footnote-title'] },
      clobberPrefix: '',
      footnoteBackContent: '⤣', //↥
    },
  },
  // trailingSlash: 'ignore',
  integrations: [
    // tailwind(),
    sitemap(),
    icon(),
  ],
});
