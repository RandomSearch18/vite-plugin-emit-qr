import { UserConfig } from "vite"
import Inspect from "vite-plugin-inspect"

const config: UserConfig = {
  plugins: [Inspect()],
}

export default config
