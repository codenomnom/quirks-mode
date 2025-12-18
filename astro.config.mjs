// @ts-check
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';


// import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://quirks-mode.com',
  prefetch: {
    defaultStrategy: 'load',
    prefetchAll: true,
  },
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          // @ts-ignore
          rel: (el) => {
            const href = el.properties.href;
            const trustedDomains = ['quirks-mode.com', 'codenomnom.com', 'github.com/codenomnom'];
            const isTrusted = trustedDomains.some((domain) => href.includes(domain));

            return isTrusted
              ? ['noopener', 'noreferrer']
              : ['nofollow', 'noopener', 'noreferrer'];
          }
        },
      ],
    ],
    remarkRehype: {
      footnoteLabel: 'notes:',
      footnoteLabelTagName: 'h3',
      footnoteLabelProperties: { className: ['footnote-title'] },
      clobberPrefix: '',
      footnoteBackContent: '[⤣ back]', // ⤣↥
    },
  },
  // trailingSlash: 'ignore',
  integrations: [
    // tailwind(),
    sitemap(),
    icon(),
  ],
});
