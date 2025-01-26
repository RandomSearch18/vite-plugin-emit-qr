import { UserConfig } from "vite"
import Inspect from "vite-plugin-inspect"
import EmitQR from "../src/index.ts"

const config: UserConfig = {
  plugins: [Inspect(), EmitQR()],
}

export default config
