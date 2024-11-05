# README

基于 Vue3 和 Element Plus 的表单设计器

## Preview

[Preview](./preview.png)

## 安装

```bash
npm install @idonnyfe/ep-form-designer
```

## 使用

在`main.js`中，导入组件

```js
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import FormDesigner from '@idonnyfe/ep-form-designer'
import '@idonnyfe/ep-form-designer/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(FormDesigner)
app.mount('#app')
```

### 使用表单设计器(FormDesigner)

在模板中使用`FormDesigner`设计器组件示例：

```html
<script setup>
	import { ref } from 'vue'

	const formOptions = {
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

	// 表单数据
	let formData = ref(formOptions)

	// 上传配置
	let uploadOptions = {
		action: 'http://0.0.0.0:8888/api/upload/files',
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

	// 组件组
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
		:control-groups="controlGroups"
		:upload-options="uploadOptions"
		:form-data="formData"
	></FormDesigner>
</template>
```

### 使用表单渲染器(FormRenderer)

在模板中使用`FormRenderer`渲染器组件示例：

```html
<script setup>
	import { ref } from 'vue'

	const formOptions = {
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

	const formData = ref(formOptions)
	const formModel = ref({})

	formOptions.controls.forEach(control => {
		if (control.props.defaultValue !== undefined)
			formModel.value[control.id] = control.props.defaultValue
	})
</script>
<template>
	<FormRenderer
		ref="formRenderer"
		:form-data="formData"
		:form-model="formModel"
	/>
</template>
```

### 使用表单预览(FormViewer)

在模板中使用`FormViewer`预览组件示例：

```html
<script setup>
	import { ref } from 'vue'

	const formOptions = {
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

	// 表单数据
	const formData = ref(formOptions)
	const formModel = ref({})

	formOptions.controls.forEach(control => {
		if (control.props.defaultValue !== undefined)
			formModel.value[control.id] = control.props.defaultValue
	})
</script>
<template>
	<FormViewer
		:form-data="formData"
		:form-model="formModel"
	/>
</template>
```
