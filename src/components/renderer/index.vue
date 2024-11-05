<script setup>
	import { ref, provide } from 'vue'
	import FormItemRenderer from './form-item-renderer.vue'

	defineOptions({
		name: 'FormRenderer'
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
		uploadOptions: {
			type: Object,
			default: {
				action: '',
				getHeaders: () => ({}),
				getFileHook: (response, file) => ({ name: file, url: response.url })
			}
		},
		formModel: {
			type: Object,
			default: {},
			required: true
		}
	})

	provide('uploadOptions', props.uploadOptions)
	provide('formProps', props.formData.props)

	let form = ref(null)
	//验证，回调传入是否验证成功
	function validate(callback) {
		console.log('props.formData:', props.formData)
		console.log('props.formModel', props.formModel)
		form.value.validate(callback)
	}
	function resetFields() {
		form.value.resetFields()
	}
	function clearValidate(ps) {
		form.value.clearValidate(ps)
	}
	function scrollToField(prop) {
		form.value.scrollToField(prop)
	}

	defineExpose({
		validate,
		resetFields,
		scrollToField,
		clearValidate
	})
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
		<FormItemRenderer
			:controls="formData.controls"
			:upload-options="uploadOptions"
			:form-model="formModel"
		></FormItemRenderer>
	</el-form>
</template>

<style lang="scss" scoped>
	.form-renderer {
		@apply flex flex-wrap overflow-y-auto content-start;
	}
</style>
