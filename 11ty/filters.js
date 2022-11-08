const util = require('util');
const { DateTime } = require('luxon');
const { dir, TEMPLATE_ENGINE } = require('./config');

const LAYOUT_REGEX = new RegExp(`${dir.layoutsFolder}\\/(.*?)\\.${TEMPLATE_ENGINE}`, 'g');

exports.toJSON = util.inspect;

exports.postDate = (dateObj) => DateTime.fromJSDate(dateObj).toFormat('dd/MM/yyyy'); // "dd'd' MM'm' yy'y'"

exports.getPageIndex = (name) => {
  const dashIndex = name.indexOf('-');
  const index = name.substring(0, dashIndex);
  if (Number.isInteger(Number(index))) {
    return index;
  }
  return name;
};

exports.last = (collection, limit = 0) => collection.slice(0, limit);

exports.reverse = (collection) => collection.reverse();

exports.parseLayoutName = (name) => name.replace(LAYOUT_REGEX, '$1');
