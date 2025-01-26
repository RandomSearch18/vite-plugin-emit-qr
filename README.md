# vite-plugin-emit-qr

> Automatically encode your web app into a `data:` QR code

This is a Vite plugin that takes the built `index.html` file, encodes it as a `data:` URI, and emits a QR code image file that contains that data. In other words, your whole web app can be encoded as a QR code, subject to the following conditions:

- All source files must be embedded into the `index.html` file
  - This can be automatically done by using [`vite-plugin-singlefile`](https://www.npmjs.com/package/vite-plugin-singlefile)
- The built `index.html` file must be under 3 KB, because that's the maximum number of bytes that can be encoded in a QR code
  - This plugin will encode your HTML file as-is, so it's recommended to use a plugin like [`vite-plugin-html`](https://github.com/vbenjs/vite-plugin-html) to minify your HTML file first
  - To keep size down, you should also ensure any CSS and JS is minified

## Example usage

Here's an example of using this plugin alongside `vite-plugin-singlefile` and `vite-plugin-html`, as recommended above:

```js
// TODO
```

## Credits

- I looked at [the code for `vite-plugin-html`](https://github.com/vbenjs/vite-plugin-html/blob/main/packages/core/src/htmlPlugin.ts) to help me work out how to work with the built HTML output from Vite
- Also thank you to `vite-plugin-html` for helping me discover the `html-minifier-terser` library
- The [`html-minifier-terser`](https://www.npmjs.com/package/html-minifier-terser) library let me easily add HTML minification support to this plugin
- I also used the [`node-qrcode`](https://www.npmjs.com/package/qrcode) library to generate the QR code image, which is obviously a pretty important part of this plugin
