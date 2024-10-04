import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { getCollection } from 'astro:content';

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const posts = await getCollection('quirks');

  return rss({
    title: 'quirks-mode',
    description: 'A humble Astronaut’s guide to the stars',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site!,
    stylesheet: '/rss/pretty-feed-v3.xsl',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/quirks/${post.slug}`, // IMPORTANT: make sure to update if changing the url
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
    })),
    customData: `<language>en-us</language>`,
  });
}
