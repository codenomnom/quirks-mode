const dir = {
  input: 'src',
  output: 'dist',
  content: 'pages',
  layoutsFolder: 'layouts',
};
dir.contentFull = `./${dir.input}/${dir.content}/`;

const TEMPLATE_ENGINE = 'njk';

const pages = {
  home: {
    limit: 2,
  },
};

module.exports = {
  dir,
  pages,
  TEMPLATE_ENGINE,
  enableGlitch: false,
};
