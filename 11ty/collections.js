const { dir } = require('./config');

const getPages = (collection) => {
  return collection.getFilteredByGlob(`${dir.contentFull}/**/*.md`);
}

module.exports = {
  getPages,
};
