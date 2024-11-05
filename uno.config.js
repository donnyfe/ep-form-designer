import { defineConfig, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
	presets: [presetUno()],
	// 配置指令以支持@apply
	transformers: [transformerDirectives()]
})
