<script setup>
	import { defineComponent, provide } from 'vue'
	import FormItemViewer from './form-item-viewer.vue'

	defineOptions({
		name: 'FormViewer'
	})

	//组件的属性
	let props = defineProps({
		formData: {
			type: Object,
			default: {
				controls: [],
				props: {
					labelPosition: 'right',
					labelWidth: 100,
					size: 'default',
					customClass: '',
					cols: 12
				}
			},
			required: true
		},
		formModel: {
			type: Object,
			default: {},
			required: true
		}
	})

	provide('formProps', props.formData.props)
</script>

<template>
	<el-form
		ref="form"
		class="form-renderer"
		:label-position="formData.props.labelPosition"
		:label-width="formData.props.labelWidth"
		:size="formData.props.size"
		:class="[formData.props.customClass]"
		:model="formModel"
		:status-icon="false"
	>
		<FormItemViewer
			:controls="formData.controls"
			:form-model="formModel"
		></FormItemViewer>
	</el-form>
</template>

<style lang="scss" scoped>
	.form-renderer {
		@apply flex flex-wrap overflow-y-auto content-start;
	}

	@media (max-width: 767px) {
		.form-item-wrap {
			width: 100% !important;
		}
	}
</style>
