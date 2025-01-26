import { Plugin, ResolvedConfig } from "vite"
import { toDataUri } from "./dataUri.ts"
import qrcode, { QRCodeToFileOptions } from "qrcode"
import path from "node:path"
import { mkdir } from "node:fs/promises"

interface EmitQROutputOptions {
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

export interface EmitQRConfig {
  buildOutput: Partial<EmitQROutputOptions> & {
    /** The directory to write the QR code image file to, relative to the Vite output directory
     *
     * - Defaults to the root of the Vite output directory
     * - Example: `"public"`
     */
    outputDir?: string
  }
  devServerOutput: Partial<EmitQROutputOptions> & {
    /** The directory to write the QR code image file to, relative to the root of the project
     *
     * - Defaults to the root of the project
     * - Example: `"docs/assets"`
     */
    outputDir?: string
  }
}

async function writeQR(
  dataUri: string,
  dirPath: string[],
  fileName: string,
  qrConfig: QRCodeToFileOptions
) {
  const directory = path.join(...dirPath)
  await mkdir(directory, { recursive: true })
  const fullPath = path.join(directory, fileName)
  qrcode.toFile(fullPath, dataUri, qrConfig)
}

export default function EmitQR(config: EmitQRConfig): Plugin {
  config.buildOutput ??= {}
  config.devServerOutput ??= {}
  const buildConfig = {
    outputDir: config.buildOutput.outputDir ?? "",
    fileName: config.buildOutput.fileName ?? "index.html.png",
    fileType: config.buildOutput.fileType ?? "png",
  }
  const devConfig = {
    outputDir: config.devServerOutput.outputDir ?? "",
    fileName: config.devServerOutput.fileName ?? "index.html.png",
    fileType: config.devServerOutput.fileType ?? "png",
  }

  let viteConfig: ResolvedConfig

  return {
    name: "emit-qr",
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },
    async transformIndexHtml(html: string, ctx) {
      const isBuild = !!ctx.bundle
      const dataUri = toDataUri(html, "text/html")
      if (isBuild) {
        // If the app is being built, output the QR code to the Vite output (dist) directory
        const outputDir = path.resolve(
          viteConfig.root,
          viteConfig.build.outDir,
          buildConfig.outputDir
        )
        return writeQR(dataUri, [outputDir], buildConfig.fileName, {
          type: buildConfig.fileType,
        })
      }
      // If the dev server is being run, output the QR code to the project root
      const outputDir = path.resolve(viteConfig.root, devConfig.outputDir)
      return writeQR(dataUri, [outputDir], devConfig.fileName, {
        type: devConfig.fileType,
      })
    },
  }
}
