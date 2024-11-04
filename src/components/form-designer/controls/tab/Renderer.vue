<script setup>
	import DesignerItemRenderer from '../../designer/designer-item-renderer.vue'
	import FormItemRenderer from '../../renderer/form-item-renderer.vue'

	defineProps({
		control: Object,
		model: Object
	})
</script>

<template>
	<div
		class="form-tabs"
		cols="12"
	>
		<el-tabs v-if="model">
			<el-tab-pane
				v-for="(item, index) in control.props.columns"
				:label="item.label"
				:key="index"
			>
				<FormItemRenderer
					:controls="item.controls"
					:formModel="model"
				></FormItemRenderer>
			</el-tab-pane>
		</el-tabs>
		<el-tabs v-else>
			<el-tab-pane
				v-for="(item, index) in control.props.columns"
				:label="item.label"
				:key="index"
			>
				<DesignerItemRenderer :controls="item.controls"></DesignerItemRenderer>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<style lang="scss" scoped>
	.form-tabs {
		.form-item-draggable {
			min-height: 80px;
		}
	}
</style>
