import { defineCollection, getCollection, z, type CollectionEntry } from 'astro:content';
// import { glob } from 'astro/loaders'; // not available with legacy API

const schema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string().optional(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).optional()
});

const quirks = defineCollection({
  type: 'content',
  // loader: glob({ pattern: '**\/[^_]*.md', base: './src/quirks' }),
  schema,
});
export const collections = { quirks };

type Post = CollectionEntry<"quirks">;

export async function getAllPosts() {
  const posts: Array<Post> = await getCollection("quirks", ({ data }: { data: z.infer<typeof schema> }) => {
    if (import.meta.env.PROD) { // production, so hide drafts and scheduled posts
      if (data.draft === true) {
        console.log(' > skipping draft article, as env is production (title: %s)', data.title);
        return false;
      }

      if (data.date) {
        const isInThePast = data.date <= new Date();
        if (!isInThePast) {
          console.log(' > skipping scheduled article, as date is in the future (title: %s, date: %s)', data.title, data.date.toDateString());
        }
        return isInThePast;
      }
    }

    return true;
  });
  return posts.sort((a, b) => {
    const aDate = a.data.date || new Date();
    const bDate = b.data.date || new Date();
    return +bDate - +aDate;
  })
}

export async function getPostsGroupedByTags(): Promise<Map<string, Array<Post>>> {
  const posts = await getAllPosts();
  return posts.reduce(
    (allTags: Map<string, Array<Post>>, post: Post) => {
      const postTags: Array<string> = post.data.tags || [];
      postTags.forEach((tag) => {
        if (!allTags.has(tag)) {
          allTags.set(tag, []);
        }
        allTags.get(tag)!.push(post);
      });
      return allTags;
    },
    new Map([
      ['html', []],
      ['css', []],
      ['js', []],
    ]),
  );
}

export async function getAllTags() {
  const posts = await getPostsGroupedByTags();
  return Array.from(posts.keys());
}
