import { Plugin } from "vite"
import { toDataUri } from "./dataUri.ts"
import { toFile } from "qrcode"

export default function EmitQR(): Plugin {
  return {
    name: "emit-qr",
    buildEnd() {
      for (const moduleId of this.getModuleIds()) {
        console.log(
          moduleId,
          // this.getFileName(moduleId),
          this.getModuleInfo(moduleId)
        )
      }
    },
    transformIndexHtml(html: string) {
      // const dataUri = toDataUri(html, "text/html")
      // console.log(dataUri)
      // console.log(this, global)
      // this.warn("aaa")
      // // @ts-ignore
      // this.emitFile({
      //   type: "asset",
      //   fileName: "text.txt",
      //   source: dataUri,
      // })
    },
  }
}
