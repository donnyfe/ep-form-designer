<script setup>
	import FormItemViewer from '../../viewer/form-item-viewer.vue'

	defineProps({
		control: Object,
		model: Object
	})
</script>

<template>
	<el-tabs v-if="model">
		<el-tab-pane
			v-for="(item, index) in control.props.columns"
			:label="item.label"
			:key="index"
		>
			<FormItemViewer
				:controls="item.controls"
				:formModel="model"
			></FormItemViewer>
		</el-tab-pane>
	</el-tabs>
</template>
