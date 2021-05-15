# Lottie to SVG Converter

> Convert a frame of a [Lottie animation](https://github.com/airbnb/lottie-web) into an SVG. You may also be interested in the [Gatsby Remark plugin](https://github.com/chadly/gatsby-remark-lottie) that uses this project.

Convert this animation to a standard SVG:

| Animation                 |  Static SVG                                     |
| ------------------------- | ----------------------------------------------- |
| ![animation](example.gif) | <img src="example.svg" width="300" alt="SVG" /> |

This SVG is converted from [this animation](https://lottiefiles.com/28784-businessmen-at-the-table) from [Lottie Files](https://lottiefiles.com/).

> Note that this README shows the animation as a GIF since I can't load the lottie scripts in a README.

### Wait, just one frame?

Yes, just one frame. This can be useful to show a preview of your animation as an SVG before the lottie animation script has fully loaded.

If you found this project because you wanted to convert your full lottie animation to an animated SVG, sorry, I can't help you. I would even go so far as to argue that you shouldn't want to do that. There is debate out there on whether CSS animations (which an animated SVG would use) is better/faster/stronger than JS animations. [JS animations win](https://greensock.com/css-performance). Keep using lottie. Be happy.

If you still aren't convinced, there are other projects out there to convert your full lottie animation into other file types:

* [lottie-node](https://github.com/friday/lottie-node)
* [puppeteer-lottie](https://github.com/transitive-bullshit/puppeteer-lottie)

## Usage

```bash
npm install lottie-to-svg
```

```js
const fs = require("fs");
const renderSvg = require("lottie-to-svg");

const animationData = JSON.parse(fs.readFileSync(`myanim.json`, "utf8"));

renderSvg(animationData).then(svg => {
  fs.writeFileSync(`myanim.svg`, svg, "utf8");
});
```

### Render Settings

You can pass render settings for [lottie-web](https://github.com/airbnb/lottie-web) (which does the actual rendering of the animation) as the second argument to `renderSvg`. See full list of [available options](https://github.com/airbnb/lottie-web#other-loading-options).

### Frame Number

You can pass a frame number (to render a specific frame) as the third argument to `renderSvg`. By default it will render the first frame.

## How It Works

[lottie-web](https://github.com/airbnb/lottie-web) only supports rendering in a browser environment. This project uses [jsdom](https://github.com/jsdom/jsdom) to fool lottie-web into rendering in a node environment.

It uses lottie's SVG renderer to render one frame of the animation and then pulls the outputted SVG out of jsdom and then gives it to you, dear user, to do what you will with it.
