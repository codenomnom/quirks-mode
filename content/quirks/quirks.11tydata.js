const exclude = (data) => {
  if (data.draft || data.page.date >= new Date()) {
    return true;
  }
  return false;
}
module.exports = {
  layout: 'layouts/post.njk',
  tags: ['posts'],
  eleventyComputed: { // TODO: is this needed?
    permalink: (data) => exclude(data) ? false : `/quirks/{{ page.fileSlug }}/`,
    eleventyExcludeFromCollections: (data) => exclude(data)
  }
}
