import { UserConfig } from "vite"
import Inspect from "vite-plugin-inspect"
import { viteSingleFile } from "vite-plugin-singlefile"
import { createHtmlPlugin } from "vite-plugin-html"
import EmitQR from "../src/index.ts"

const config: UserConfig = {
  server: {
    allowedHosts: [".csb.app"],
  },
  plugins: [
    Inspect(),
    viteSingleFile({
      removeViteModuleLoader: true,
    }),
    createHtmlPlugin({
      minify: true,
    }),
    // @ts-ignore Typescript doesn't think that the Plugin types from two different installations of Vite are compatible
    EmitQR({
      buildOutput: {
        //
        fileName: "qr.png",
      },
      devServerOutput: {
        //
        outputDir: "public",
        fileName: "qr.png",
      },
    }),
  ],
}

export default config
