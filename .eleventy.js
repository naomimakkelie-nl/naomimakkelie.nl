module.exports = function (eleventyConfig) {
    // Override any default config values here
    // For example, add a custom layout:
    eleventyConfig.addLayoutAlias('default', 'default.html');
    eleventyConfig.addPassthroughCopy({"src/_public": "."});
    return {
        passthroughFileCopy: true,
        layoutAliases: true,
        dataTemplateEngine: false,
        // pathPrefix: "/",
        // htmlOutputSuffix: "-o",
        // jsDataFileSuffix: ".11tydata",
        // templateFormats: ["html", "liquid", "ejs", "md", "hbs", "mustache", "haml", "pug", "njk", "11ty.js"],
        // markdownTemplateEngine: 'liquid',
        // htmlTemplateEngine: 'liquid',
        dir: {
            input: 'src',
            layouts: "_layouts",
            includes: '_includes',
            data: "_data",
            output: '.build',
        }
    };
};
