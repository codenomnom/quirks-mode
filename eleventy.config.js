const { DateTime } = require('luxon');
const markdownItAnchor = require('markdown-it-anchor');

const config = require('./11ty/config');
const filters = require('./11ty/filters');
const plugins = require('./11ty/plugins');

const { getPosts } = require('./11ty/collections');

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = function(eleventyConfig) {
    const { dir, TEMPLATE_ENGINE } = config;

    // copy the contents of the `public` folder to the output folder
    // For example, `./public/css/` ends up in `_site/css/`
    eleventyConfig.addPassthroughCopy({
        './public/': '/',
        './node_modules/prismjs/themes/prism-okaidia.css': '/css/prism-okaidia.css'
    });

    filters.register(eleventyConfig);

    eleventyConfig.addCollection('posts', getPosts);
    eleventyConfig.addCollection('tags', (collection) => {
        const tags = new Set();
        collection.getAll().forEach((page) => (page.data.tags || []).forEach((tag) => tags.add(tag)));
        return [...tags];
    });

    // Run Eleventy when these files change:
    // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

    // Watch content images for the image pipeline.
    eleventyConfig.addWatchTarget('content/**/*.{svg,webp,png,jpeg}');

    plugins.install(eleventyConfig);

    // Filters
    eleventyConfig.addFilter('readableDate', (dateObj, format, zone) => {
        // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
        return DateTime.fromJSDate(dateObj, { zone: zone || 'utc' }).toFormat(format || 'dd LLLL yyyy');
    });

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });

    // Return the smallest number argument
    eleventyConfig.addFilter('min', (...numbers) => {
        return Math.min.apply(null, numbers);
    });

    // Return all the tags used in a collection
    eleventyConfig.addFilter('getAllTags', collection => {
        let tagSet = new Set();
        for(let item of collection) {
            (item.data.tags || []).forEach(tag => tagSet.add(tag));
        }
        return Array.from(tagSet);
    });

    eleventyConfig.addFilter('filterTagList', function filterTagList(tags) {
        return (tags || []).filter(tag => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1);
    });

    // Customize Markdown library settings:
    eleventyConfig.amendLibrary('md', mdLib => {
        mdLib.use(markdownItAnchor, {
            permalink: markdownItAnchor.permalink.ariaHidden({
                placement: 'before',
                class: 'header-anchor',
                symbol: '#',
                ariaHidden: false,
            }),
            level: [1,2,3,4],
            slugify: eleventyConfig.getFilter('slugify')
        });
    });

    // Features to make your build faster (when you need them)

    // If your passthrough copy gets heavy and cumbersome, add this line
    // to emulate the file copy on the dev server. Learn more:
    // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

    // eleventyConfig.setServerPassthroughCopyBehavior('passthrough');

    return {
        // pre-process *.md files with
        markdownTemplateEngine: TEMPLATE_ENGINE,

        dataTemplateEngine: TEMPLATE_ENGINE,

        // pre-process *.html files with
        htmlTemplateEngine: TEMPLATE_ENGINE,

        // control which files Eleventy will process
        templateFormats: ['html', 'md', TEMPLATE_ENGINE],

        dir,

        // -----------------------------------------------------------------
        // Optional items:
        // -----------------------------------------------------------------

        // If your site deploys to a subdirectory, change `pathPrefix`.
        // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

        // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
        // it will transform any absolute URLs in your HTML to include this
        // folder name and does **not** affect where things go in the output folder.
        pathPrefix: '/',
    };
};
