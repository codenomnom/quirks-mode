const { dir } = require('./config');
const { orderByName } = require('./filters');

const getPages = (collection) => {
  return orderByName(collection.getFilteredByGlob(`${dir.contentFull}/**/*.md`));
}

const getPosts = (collection) => {
  return orderByName(collection.getFilteredByTag('quirks'));
}

module.exports = {
  getPages,
  getPosts,
};
