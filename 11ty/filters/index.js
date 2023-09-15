const util = require('util');
const { DateTime } = require('luxon');
const { dir, TEMPLATE_ENGINE } = require('../config');

const LAYOUT_REGEX = new RegExp(`${dir.layoutsFolder}\\/(.*?)\\.${TEMPLATE_ENGINE}`, 'g');
const CODE_REGEX = new RegExp('<code>(.*?)<\\/code>', 'g');

exports.toJSON = util.inspect;
exports.postDate = (dateObj) => DateTime.fromJSDate(dateObj).toFormat('dd/MM/yyyy'); // "dd'd' MM'm' yy'y'"
exports.first = (array, count) => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  if (count < 0) {
    return array.slice(count);
  }

  return array.slice(0, count);
}
exports.last = (collection, limit = 0) => limit ? collection.slice(-limit) : collection;
exports.parseLayoutName = (name) => name.replace(LAYOUT_REGEX, '$1');
exports.stripCodeTag = (str) => str.replace(CODE_REGEX, '$1');
exports.orderByName = (collection) => (collection || []).sort((a, b) => b.filePathStem.localeCompare(a.filePathStem));

exports.getPageIndex = (name) => {
  const dashIndex = name.indexOf('-');
  const index = name.substring(0, dashIndex);
  if (Number.isInteger(Number(index))) {
    return index;
  }
  return name;
};

exports.getTagsFromCollection = (collection) => {
  let tagSet = new Set();
  for(let item of collection) {
    (item.data.tags || []).forEach(tag => tagSet.add(tag));
  }
  return Array.from(tagSet);
};

exports.filterTagsList = (tags) => (tags || []).filter(tag => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1);

exports.register = (eleventyConfig) => {
  eleventyConfig.addFilter('toJSON', exports.toJSON);
  eleventyConfig.addFilter('postDate', exports.postDate);
  eleventyConfig.addFilter('getPageIndex', exports.getPageIndex);
  eleventyConfig.addFilter('getTagsFromCollection', exports.getTagsFromCollection);
  eleventyConfig.addFilter('filterTagsList', exports.filterTagsList);
  eleventyConfig.addFilter('first', exports.first);
  eleventyConfig.addFilter('last', exports.last);
  eleventyConfig.addFilter('parseLayoutName', exports.parseLayoutName);
  eleventyConfig.addFilter('stripCodeTag', exports.stripCodeTag);
  eleventyConfig.addFilter('orderByName', exports.orderByName);
};
