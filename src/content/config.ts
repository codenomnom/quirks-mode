import { defineCollection, getCollection, z, type CollectionEntry } from 'astro:content';
// import { glob } from 'astro/loaders'; // not available with legacy API

const quirks = defineCollection({
  type: 'content',
  // loader: glob({ pattern: '**\/[^_]*.md', base: './src/quirks' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional()
  })
});
export const collections = { quirks };

export async function getAllPosts() {
  const posts = await getCollection("quirks", ({ data }) => {
    if (import.meta.env.PROD) { // production, so hide drafts and scheduled posts
      if (data.draft === true) {
        return false;
      }

      if (data.date) {
        return (data.date >= new Date());
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

export async function getPostsGroupedByTags() {
  const posts = await getAllPosts();
  return posts.reduce(
    (allTags: Record<string, Array<CollectionEntry<"quirks">>>, post) => {
      const postTags = post.data.tags || [];
      postTags.forEach((tag) => {
        if (!allTags[tag]) {
          allTags[tag] = [];
        }
        allTags[tag].push(post);
      });
      return allTags;
    },
    {},
  );
}

export async function getAllTags() {
  const posts = await getPostsGroupedByTags();
  return Object.keys(posts);
}
