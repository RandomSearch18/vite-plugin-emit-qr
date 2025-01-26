import { Plugin, ResolvedConfig } from "vite"
import { toDataUri } from "./dataUri.ts"
import qrcode from "qrcode"
import path from "node:path"

export interface EmitQRConfig {
  /** The directory to write the QR code image file to, relative to the Vite output directory
   *
   * - Defaults to the root of the Vite output directory
   * - Example: `"public"`
   */
  outputDir: string
  /** The name of the QR code image file. Should end in `.png`
   *
   * - Default: `"index.html.png"`
   * - Example: `"my-app.png"`
   */
  outputFileName: string
}

export default function EmitQR(specifiedConfig: Partial<EmitQRConfig>): Plugin {
  const config: EmitQRConfig = {
    outputDir: specifiedConfig.outputDir ?? "",
    outputFileName: specifiedConfig.outputFileName ?? "index.html.png",
  }

  let viteConfig: ResolvedConfig

  return {
    name: "emit-qr",
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },
    transformIndexHtml(html: string) {
      const dataUri = toDataUri(html, "text/html")
      console.log(dataUri)
      const viteOutputDir = path.resolve(
        viteConfig.root,
        viteConfig.build.outDir
      )
      const qrPath = path.join(
        viteOutputDir,
        config.outputDir,
        config.outputFileName
      )
      qrcode.toFile(qrPath, dataUri)
    },
  }
}
