import { Plugin } from "vite"
import { toDataUri } from "./dataUri.ts"
import { toFile } from "qrcode"

export default function EmitQR(): Plugin {
  return {
    name: "emit-qr",
    transformIndexHtml(html: string) {
      const dataUri = toDataUri(html, "text/html")
      console.log(dataUri)
    },
  }
}
