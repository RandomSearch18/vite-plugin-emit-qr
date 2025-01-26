import { Plugin, ResolvedConfig } from "vite"
import { toDataUri } from "./dataUri.ts"
import qrcode from "qrcode"
import path from "node:path"
import { mkdir } from "node:fs/promises"

export interface EmitQRConfig {
  /** The directory to write the QR code image file to, relative to the Vite output directory
   *
   * - Defaults to the root of the Vite output directory
   * - Example: `"public"`
   */
  outputDir: string
  /** The name of the QR code image file, including the file extension
   *
   * - Should end in `.png` (or another appropriate file extension as per the `fileType` option)
   * - Default: `"index.html.png"`
   * - Example: `"my-app.png"`
   */
  fileName: string
  /** The file type to output the QR code as
   *
   * - Default: `"png"`
   * - Example: `"svg"` to output it as an SVG file
   */
  fileType: "png" | "svg"
}

export default function EmitQR(specifiedConfig: Partial<EmitQRConfig>): Plugin {
  const config: EmitQRConfig = {
    outputDir: specifiedConfig.outputDir ?? "",
    fileName: specifiedConfig.fileName ?? "index.html.png",
    fileType: specifiedConfig.fileType ?? "png",
  }

  let viteConfig: ResolvedConfig

  return {
    name: "emit-qr",
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },
    async transformIndexHtml(html: string) {
      const dataUri = toDataUri(html, "text/html")
      const viteOutputDir = path.resolve(
        viteConfig.root,
        viteConfig.build.outDir
      )
      const qrDirectory = path.join(viteOutputDir, config.outputDir)

      await mkdir(qrDirectory, { recursive: true })
      const qrPath = path.join(qrDirectory, config.fileName)
      qrcode.toFile(qrPath, dataUri, {
        type: config.fileType,
      })
    },
  }
}
