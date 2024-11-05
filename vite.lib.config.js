import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), UnoCSS()],
	resolve: {
		alias: {
			'@': path.resolve('./src')
		}
	},
	build: {
		outDir: 'dist',
		lib: {
			entry: path.resolve(__dirname, 'src/export.js'),
			name: 'FormDesigner',
			formats: ['es', 'umd'],
			fileName: format => `index.${format}.js`
		},
		rollupOptions: {
			external: ['vue', 'element-plus'],
			output: {
				globals: {
					vue: 'Vue',
					'element-plus': 'ElementPlus'
				},
				assetFileNames: 'index.css'
			}
		},
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		}
	}
})
