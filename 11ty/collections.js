const { dir } = require('./config');
const { orderByName } = require('./filters');

const getPages = (collection) => {
  return orderByName(collection.getFilteredByGlob(`${dir.contentFull}/**/*.md`));
}

module.exports = {
  getPages,
};
