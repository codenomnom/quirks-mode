import rss from '@astrojs/rss';
import MarkdownIt from 'markdown-it';
import type { APIContext } from 'astro';
import sanitizeHtml from 'sanitize-html';

import { stripCodeTag } from '../utils';
import { getAllPosts } from '../content/config';

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const posts = await getAllPosts();

  return rss({
    title: 'quirks-mode',
    description: 'A humble Astronaut’s guide to the stars',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site!,
    stylesheet: '/rss/pretty-feed-v3.xsl',
    items: posts.map((post) => (
      {
        title: stripCodeTag(post.data.title),
        pubDate: post.data.date,
        description: post.data.description,
        link: `/quirks/${post.slug}`, // IMPORTANT: make sure to update if changing the url
        content: sanitizeHtml(parser.render(post.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        }),
      }
    )),
    customData: `<language>en-us</language>`,
  });
}
