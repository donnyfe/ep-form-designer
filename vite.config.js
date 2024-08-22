import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), UnoCSS()],
	resolve: {
		alias: {
			"@": path.resolve("./src"),
		},
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/export.js"),
			name: "FormDesigner",
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
	},
});
