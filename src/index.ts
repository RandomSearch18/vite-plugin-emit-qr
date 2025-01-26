import { Plugin, ResolvedConfig } from "vite"
import { toDataUri } from "./dataUri.ts"
import qrcode from "qrcode"
import path from "node:path"

export default function EmitQR(): Plugin {
  let viteConfig: ResolvedConfig

  return {
    name: "emit-qr",
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },
    transformIndexHtml(html: string) {
      const dataUri = toDataUri(html, "text/html")
      console.log(dataUri)
      const outputDir = path.resolve(viteConfig.root, viteConfig.build.outDir)
      const qrPath = path.join(outputDir, "index.html.png")
      qrcode.toFile(qrPath, dataUri)
    },
  }
}
