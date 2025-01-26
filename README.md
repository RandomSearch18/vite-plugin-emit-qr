# vite-plugin-emit-qr

> Automatically encode your web app into a `data:` QR code

This is a Vite plugin that takes the built `index.html` file, encodes it as a `data:` URI, and emits a QR code image file that contains that data. In other words, your whole web app can be encoded as a QR code, subject to the following conditions:

- All source files must be embedded into the `index.html` file, e.g. with inline `<script>` tags
  - This can be automatically done by using [`vite-plugin-singlefile`](https://www.npmjs.com/package/vite-plugin-singlefile)
  - Also for this reason, multi-page apps are not supported
- The built `index.html` file must be under 3 KB, because that's the maximum number of bytes that can be encoded in a QR code
  - This plugin will encode your HTML file as-is, so it's recommended to use a plugin like [`vite-plugin-html`](https://github.com/vbenjs/vite-plugin-html) to minify your HTML file first
  - To keep size down, you should also ensure any CSS and JS is minified

## Example usage

Here's an example of using this plugin alongside `vite-plugin-singlefile` and `vite-plugin-html`, as recommended above:

`vite.config.js`:

```js
const config = {
  plugins: [
    viteSingleFile(),
    createHtmlPlugin({
      minify: true,
    }),
    EmitQR({
      // Options for when `vite build` is run:
      buildOutput: {
        // Save the QR code as my-app.png in the build output folder (i.e. dist/)
        fileName: "my-app.png",
      },
      // Options for when `vite` is run (to start the dev server):
      devServerOutput: {
        // Save the QR code as my-app.png in the public/ folder
        outputDir: "public",
        fileName: "my-app.png",
      },
    }),
  ],
}

export default config
```

## Configuration

Configure the plugin by providing it an object with the `buildOutput` and `devServerOutput` properties, to configure the options for when your app is being built, or when the dev server is used, respectively. Each of those properties can contain the following options:

- `fileName`: The name of the QR code image file, including the file extension
  - Should end in `.png` (or another appropriate file extension as per the `fileType` option)
  - Default: `"index.html.png"`
  - Example: `"my-app.png"`
- `fileType`: The file type to output the QR code as
  - Currently, `svg` or `png` are supported
  - Default: `"png"`
  - Example: `"svg"` to output it as an SVG file
- `outputDir`: The directory to write the QR code image file to
  - During a build, this path is relative to the Vite output directory (`dist/` by default)
  - During development, this path is relative to the root of the project (where `vite.config.js` and `index.html` usually are)
  - Defaults to no subdirectory, i.e. the root of the output directory or project
  - Example: `"public"`, `"docs/assets"`

### Example with all options

```js
EmitQR({
  buildOutput: {
    fileName: "my-app.png",
    fileType: "png",
    outputDir: "public",
  },
  devServerOutput: {
    fileName: "qr-code.svg",
    fileType: "svg",
    outputDir: "public",
  },
})
```

## Justification for being a Vite-only plugin

`vite-plugin-emit-qr` relies on the fact that Vite projects are based around a single `index.html` file, because it's designed to encode a single file (with the code for a web app) into a QR code. In addition, the plugin makes the most sense when used in combination with other Vite-specific plugins, namely `vite-plugin-singlefile` and `vite-plugin-html`.

## Credits

- I looked at [the code for `vite-plugin-html`](https://github.com/vbenjs/vite-plugin-html/blob/main/packages/core/src/htmlPlugin.ts) to help me work out how to work with the built HTML output from Vite
<!-- - Also thank you to `vite-plugin-html` for helping me discover the `html-minifier-terser` library
- The [`html-minifier-terser`](https://www.npmjs.com/package/html-minifier-terser) library let me easily add HTML minification support to this plugin -->
- I used the [`node-qrcode`](https://www.npmjs.com/package/qrcode) library to generate the QR code image, which is obviously a pretty important part of this plugin
