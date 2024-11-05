<script setup>
import { computed } from 'vue'
import icons from './index.js'

const props = defineProps({
	name: String
})

// 将图标名称首字母大写
const iconName = computed(() => {
	if (!props.name) return ''
	let name = props.name
	// 特殊名称特殊处理
	if (name === 'v-move') {
		name = 'vmove'
	}
	name = name.charAt(0).toUpperCase() + name.slice(1)
	return `Icon${name}`
})
</script>

<template>
<component :is="icons[iconName]" />
</template>
