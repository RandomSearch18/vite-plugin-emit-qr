import { UserConfig } from "vite"
import Inspect from "vite-plugin-inspect"
import EmitQR from "../src/index.ts"

const config: UserConfig = {
  plugins: [
    Inspect(),
    // @ts-ignore Typescript doesn't think that the Plugin types from two different installations of Vite are compatible
    EmitQR({
      buildOutput: { outputDir: "nice folder", fileName: "nice.png" },
      devServerOutput: { outputDir: "images", fileName: "not-nice.png" },
    }),
  ],
}

export default config
