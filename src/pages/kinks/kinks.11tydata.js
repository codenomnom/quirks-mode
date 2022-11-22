const exclude = (data) => {
  if (data.draft || data.page.date >= new Date()) {
    return true;
  }
  return false;
}
module.exports = {
  eleventyComputed: {
    permalink: (data) => exclude(data) ? false : `/kinks/{{ page.fileSlug }}/`,
    eleventyExcludeFromCollections: (data) => exclude(data)
  }
}
