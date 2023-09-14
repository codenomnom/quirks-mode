const pluginRSS = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginBundle = require('@11ty/eleventy-plugin-bundle');
const pluginNavigation = require('@11ty/eleventy-navigation');

const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');

const pluginDrafts = require('./drafts.plugin');
const pluginImages = require('./images.plugin');

exports.install = (eleventyConfig) => {
    // App plugins
    eleventyConfig.addPlugin(pluginDrafts);
    eleventyConfig.addPlugin(pluginImages);

    // Official plugins
    eleventyConfig.addPlugin(pluginRSS);
    eleventyConfig.addPlugin(pluginSyntaxHighlight, {
        preAttributes: { tabindex: 0 }
    });
    eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(pluginBundle);
};
