const dir = {
  input: 'content',
  data: "../11ty/data",
  output: 'dist',
  content: 'quirks',

  // both are relative to input directory
  includes: '../11ty/_includes',
  layoutsFolder: 'layouts', // TODO: this is not relative?
};
dir.contentFull = `./${dir.input}/${dir.content}/`;

const TEMPLATE_ENGINE = 'njk';

const pages = {
  home: {
    limit: 2,
  },
  tags: {
    limit: 2,
  },
};

module.exports = {
  dir,
  pages,
  TEMPLATE_ENGINE,
  enableGlitch: false,
};
