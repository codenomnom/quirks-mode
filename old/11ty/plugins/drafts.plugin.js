function eleventyComputedPermalink() {
	// When using `addGlobalData` and you *want* to return a function, you must nest functions like this.
	// `addGlobalData` acts like a global data file and runs the top level function it receives.
	return (data) => {
		const now = new Date();
		if (!process.env.BUILD_DRAFTS) { // it's not local dev/serve build, so we need to be careful
			if (data.draft) {
				return false;
			}
			if (data.page.date >= now) {
				return false;
			}
		}

		return data.permalink;
	}
}

function eleventyComputedExcludeFromCollections() {
	// When using `addGlobalData` and you *want* to return a function, you must nest functions like this.
	// `addGlobalData` acts like a global data file and runs the top level function it receives.
	return (data) => {
		const now = new Date();
		if (!process.env.BUILD_DRAFTS) { // it's not local dev/serve build, so we need to be careful
			if (data.draft) {
				return true;
			}
			if (data.page.date >= now) {
				return true;
			}
		}

		return data.eleventyExcludeFromCollections;
	}
}

module.exports.eleventyComputedPermalink = eleventyComputedPermalink;
module.exports.eleventyComputedExcludeFromCollections = eleventyComputedExcludeFromCollections;

module.exports = eleventyConfig => {
	eleventyConfig.addGlobalData('eleventyComputed.permalink', eleventyComputedPermalink);
	eleventyConfig.addGlobalData('eleventyComputed.eleventyExcludeFromCollections', eleventyComputedExcludeFromCollections);

	let logged = false;
	eleventyConfig.on('eleventy.before', ({runMode}) => {
		let text = 'Excluding';
		if (runMode === 'serve' || runMode === 'watch') { // only show drafts in serve/watch modes
			process.env.BUILD_DRAFTS = true;
			text = 'Including';
		}

		if (!logged) {
			console.log( `[11ty/quirks-mode] ${text} drafts.` );
		}

		logged = true;
	});
}
