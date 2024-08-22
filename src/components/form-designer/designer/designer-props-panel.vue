<script setup lang="ts">
import types from "../controls";
import FormPropsEditor from './form-props-editor.vue';

// 组件的属性
let props = defineProps({
	data: {
		type: Object,
		required: true,
	},
	formData: {
		type: Object,
		required: true,
	},
})

</script>
<template>
	<div class="designer-props-panel">
		<el-tabs v-model="data.activeTab">
			<el-tab-pane label="组件属性" name="control">
				<el-empty v-if="data.activeControl == null" description="请选择组件"></el-empty>
				<component v-else :is="types[data.activeControl.type].PropEditor" :control="data.activeControl"
					:formProps="formData.props" />
			</el-tab-pane>
			<el-tab-pane label="表单属性" name="form">
				<FormPropsEditor :formProps="formData.props" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<style lang="scss" scoped>
.designer-props-panel {
	@apply bg-white shadow box-border flex-shrink-0 p-3 overflow-y-auto;
	width: 350px;
}
</style>
