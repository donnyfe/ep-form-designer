<script setup>
	import { ref } from 'vue'
	import FormDesigner from './components/form-designer/designer/index.vue'

	let data = ref({})

	data.value = {
		controls: [
			{
				type: 'input',
				name: '单行文本',
				key: '1bKQEPWLz',
				id: 'input_1bKQEPWLz',
				lock: false,
				dataType: 'string',
				props: {
					type: 'text',
					width: 6,
					showLabel: true,
					label: '单行文本',
					defaultValue: '',
					placeholder: '',
					required: false,
					requiredMessage: '必填字段',
					pattern: '',
					patternMessage: '格式不正确',
					disabled: false,
					clearable: false,
					readonly: false,
					showPassword: false,
					showWordLimit: false,
					maxlength: 50,
					customClass: ''
				},
				rules: [
					{
						message: '必填字段',
						required: false
					},
					{
						message: '格式不正确'
					}
				]
			},
			{
				type: 'input',
				name: '单行文本',
				key: 'iWUyrsL27',
				id: 'input_iWUyrsL27',
				lock: false,
				dataType: 'string',
				props: {
					type: 'text',
					width: 6,
					showLabel: true,
					label: '单行文本',
					defaultValue: '',
					placeholder: '',
					required: false,
					requiredMessage: '必填字段',
					pattern: '',
					patternMessage: '格式不正确',
					disabled: false,
					clearable: false,
					readonly: false,
					showPassword: false,
					showWordLimit: false,
					maxlength: 50,
					customClass: ''
				},
				rules: [
					{
						message: '必填字段',
						required: false
					},
					{
						message: '格式不正确'
					}
				]
			},
			{
				type: 'select',
				name: '下拉选择',
				key: 'QJAtV3JyW',
				id: 'select_QJAtV3JyW',
				lock: false,
				dataType: 'string',
				props: {
					width: 6,
					showLabel: true,
					label: '下拉选择',
					defaultValue: '',
					placeholder: '请选择',
					required: false,
					requiredMessage: '必填字段',
					disabled: false,
					clearable: true,
					filterable: true,
					customClass: '',
					showOptionLabel: false,
					options: [
						{
							value: '值1',
							label: '选项1'
						},
						{
							value: '值2',
							label: '选项2'
						}
					]
				},
				rules: [
					{
						message: '必填字段',
						required: false
					}
				]
			},
			{
				type: 'radio',
				name: '单选框组',
				key: 'J3bMxGylC',
				id: 'radio_J3bMxGylC',
				lock: false,
				dataType: 'string',
				props: {
					width: 6,
					showLabel: true,
					label: '单选框组',
					defaultValue: '',
					required: false,
					requiredMessage: '必填字段',
					disabled: false,
					customClass: '',
					showOptionLabel: false,
					options: [
						{
							value: '值1',
							label: '选项1'
						},
						{
							value: '值2',
							label: '选项2'
						}
					]
				},
				rules: [
					{
						message: '必填字段',
						required: false
					}
				]
			},
			{
				type: 'textarea',
				name: '多行文本',
				key: 'xoss4uKsD',
				id: 'textarea_xoss4uKsD',
				lock: false,
				dataType: 'string',
				props: {
					width: 12,
					showLabel: true,
					label: '多行文本',
					defaultValue: '',
					placeholder: '',
					required: false,
					requiredMessage: '必填字段',
					pattern: '',
					patternMessage: '格式不正确',
					disabled: false,
					readonly: false,
					showWordLimit: false,
					maxlength: 50,
					rows: 3,
					autosize: false,
					customClass: ''
				},
				rules: [
					{
						message: '必填字段',
						required: false
					},
					{
						message: '格式不正确'
					}
				]
			},
			{
				type: 'upload',
				name: '文件上传',
				key: 'u3fXwRUqu',
				id: 'upload_u3fXwRUqu',
				lock: false,
				dataType: 'string',
				props: {
					width: 6,
					showLabel: true,
					label: '文件上传',
					defaultValue: [],
					buttonText: '点击上传',
					sizeUnit: 'MB',
					size: 5,
					required: false,
					requiredMessage: '必填字段',
					multiple: false,
					withCredentials: false,
					showFileList: true,
					accept: '.jpeg,.jpg,.png',
					limit: 2,
					disabled: false,
					tip: '请上传文件',
					customClass: ''
				},
				rules: [
					{
						message: '必填字段',
						required: false
					}
				]
			},
			{
				type: 'uploadImage',
				name: '图片上传',
				key: 'yAXYQ4IYQ',
				id: 'uploadImage_yAXYQ4IYQ',
				lock: false,
				dataType: 'string',
				props: {
					width: 6,
					showLabel: true,
					label: '图片上传',
					defaultValue: [],
					sizeUnit: 'MB',
					size: 5,
					required: false,
					requiredMessage: '必填字段',
					multiple: false,
					withCredentials: false,
					showFileList: true,
					accept: '.jpg,.png',
					limit: 2,
					disabled: false,
					tip: '',
					customClass: ''
				},
				rules: [
					{
						message: '必填字段',
						required: false
					}
				]
			},
			{
				type: 'editor',
				name: '编辑器',
				key: 'm0vnAhxTw',
				id: 'editor_m0vnAhxTw',
				lock: false,
				dataType: 'string',
				props: {
					width: 12,
					placeholder: '请输入内容',
					showLabel: true,
					height: 150,
					label: '编辑器',
					defaultValue: '',
					sizeUnit: 'MB',
					size: 5,
					required: false,
					requiredMessage: '必填字段',
					withCredentials: false,
					accept: '.jpeg,.jpg,.png,.gif,.bmp',
					disabled: false,
					customClass: ''
				},
				rules: [
					{
						message: '必填字段',
						required: false
					}
				]
			}
		],
		props: {
			labelPosition: 'right',
			labelWidth: 100,
			size: 'default',
			customClass: '',
			cols: 12
		}
	}

	let uploadOptions = {
		action: 'http://localhost:8888/api/upload/files',
		getHeaders: function () {
			return { token: '123' }
		},
		getFileHook: res => {
			if (res.success) {
				return {
					name: res.result.url.substr(res.result.url.lastIndexOf('/') + 1),
					url: res.result.url
				}
			} else {
				return res.msg
			}
		}
	}

	let controlGroups = [
		{
			name: '基础组件',
			controls: ['color', 'text', 'html', 'link']
		},
		{
			name: '表单组件',
			controls: [
				'input',
				'textarea',
				'inputnumber',
				'select',
				'radio',
				'checkbox',
				'rate',
				'date',
				'time',
				'switch',
				'slider',
				'divider'
			]
		},
		{
			name: '高级组件',
			controls: ['upload', 'uploadImage', 'region', 'cascader', 'editor', 'table', 'tab']
		}
	]
</script>

<template>
	<FormDesigner
		:controlGroups="controlGroups"
		:uploadOptions="uploadOptions"
		:formData="data"
	></FormDesigner>
</template>

<style>
	html,
	body {
		margin: 0;
		padding: 0;
	}

	#app {
		height: 100vh;
	}
</style>
