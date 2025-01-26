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
