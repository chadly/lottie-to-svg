const { JSDOM } = require("jsdom");

module.exports = async (animationData, opts) => {
	const { window } = new JSDOM("<!DOCTYPE html><body></body>", {
		pretendToBeVisual: true
	});

	const { document, navigator } = window;

	// have to trick lottie into thinking it's running in a browser
	global.window = window;
	global.navigator = navigator;
	global.document = document;

	// load the lottie renderer late after globals are set
	const renderToDom = require("./render");

	const result = await renderToDom(document, animationData, opts || {});
	return result;
};
