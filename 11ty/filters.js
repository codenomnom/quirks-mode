const util = require('util');
const { DateTime } = require('luxon');
const { dir, TEMPLATE_ENGINE } = require('./config');

const LAYOUT_REGEX = new RegExp(`${dir.layoutsFolder}\\/(.*?)\\.${TEMPLATE_ENGINE}`, 'g');
const CODE_REGEX = new RegExp('<code>(.*?)<\\/code>', 'g');

exports.toJSON = util.inspect;
exports.postDate = (dateObj) => DateTime.fromJSDate(dateObj).toFormat('dd/MM/yyyy'); // "dd'd' MM'm' yy'y'"
exports.last = (collection, limit = 0) => limit ? collection.slice(0, limit) : collection;
exports.reverse = (collection) => collection.reverse();
exports.parseLayoutName = (name) => name.replace(LAYOUT_REGEX, '$1');
exports.stripCodeTag = (str) => str.replace(CODE_REGEX, '$1');
exports.orderByName = (collection) => (collection || []).sort((a, b) => a.filePathStem.localeCompare(b.filePathStem));

exports.getPageIndex = (name) => {
  const dashIndex = name.indexOf('-');
  const index = name.substring(0, dashIndex);
  if (Number.isInteger(Number(index))) {
    return index;
  }
  return name;
};

exports.registerFilters = (eleventyConfig) => {
  eleventyConfig.addFilter('toJSON', exports.toJSON);
  eleventyConfig.addFilter('postDate', exports.postDate);
  eleventyConfig.addFilter('getPageIndex', exports.getPageIndex);
  eleventyConfig.addFilter('last', exports.last);
  eleventyConfig.addFilter('reverse', exports.reverse);
  eleventyConfig.addFilter('parseLayoutName', exports.parseLayoutName);
  eleventyConfig.addFilter('stripCodeTag', exports.stripCodeTag);
  eleventyConfig.addFilter('orderByName', exports.orderByName);
};
