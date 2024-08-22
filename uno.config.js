import { defineConfig } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";

export default defineConfig({
	// 配置指令以支持@apply
	transformers: [transformerDirectives()],
});
