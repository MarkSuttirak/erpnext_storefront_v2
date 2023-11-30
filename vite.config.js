import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
		outDir: `../${path.basename(path.resolve(".."))}/public/erpnext_storefront_v2`,
		emptyOutDir: true,
		target: "es2015",
		sourcemap: true,
	},
})
