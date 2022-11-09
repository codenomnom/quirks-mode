const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const config = require('./11ty/config');
const { getPages } = require('./11ty/collections');
const { toJSON, postDate, getPageIndex, last, reverse, parseLayoutName, stripCodeTag } = require('./11ty/filters');

module.exports = (eleventyConfig) => {
  const { dir, TEMPLATE_ENGINE } = config;

  eleventyConfig.addWatchTarget('./src/styles/');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter('toJSON', toJSON);
  eleventyConfig.addFilter('postDate', postDate);
  eleventyConfig.addFilter('getPageIndex', getPageIndex);
  eleventyConfig.addFilter('last', last);
  eleventyConfig.addFilter('reverse', reverse);
  eleventyConfig.addFilter('parseLayoutName', parseLayoutName);
  eleventyConfig.addFilter('stripCodeTag', stripCodeTag);

  eleventyConfig.addGlobalData('config', () => config);

  eleventyConfig.addCollection('pages', getPages);
  eleventyConfig.addCollection('tags', (collection) => {
    const tags = new Set();
    collection.getAll().forEach((page) => (page.data.tags || []).forEach((tag) => tags.add(tag)));
    return [...tags];
  });

  return {
    markdownTemplateEngine: TEMPLATE_ENGINE,
    dataTemplateEngine: TEMPLATE_ENGINE,
    htmlTemplateEngine: TEMPLATE_ENGINE,
    templateFormats: ['html', 'md', TEMPLATE_ENGINE],
    dir,
  }
};
