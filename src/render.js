const lottie = require("lottie-web");

module.exports = (document, animationData, opts) =>
	new Promise((resolve, reject) => {
		try {
			const container = document.createElement("div");
			document.body.append(container);

			var instance = lottie.loadAnimation({
				container: container,
				renderer: "svg",
				loop: false,
				autoplay: false,
				animationData,
				rendererSettings: opts
			});

			instance.addEventListener("DOMLoaded", () => {
				resolve(container.innerHTML);
			});
		} catch (err) {
			reject(err);
		}
	});
