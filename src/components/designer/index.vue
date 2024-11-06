<script setup>
	import { ref, reactive, provide } from 'vue'
	import { ElMessage } from 'element-plus'
	import { VAceEditor } from 'vue3-ace-editor'
	import 'ace-builds/src-noconflict/mode-json'
	import 'ace-builds/src-noconflict/theme-chrome'
	import DesignerControlsPanel from '../controls-panel'
	import DesignerPropsPanel from '../props-panel'
	import FormItemRenderer from './form-item-renderer.vue'
	import FormViewer from '../viewer'
	import FormRenderer from '../renderer'
	import SvgIcon from '@/components/icons/index.vue'
	import types from '../controls'
	import { stringifyJson, parseJson } from '@/utils'

	defineOptions({
		name: 'FormDesigner'
	})

	// 组件的属性
	let props = defineProps({
		formData: {
			type: Object,
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
		controlGroups: {
			type: Array,
			default: [
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
		}
	})
	// 处理属性
	props.controlGroups.forEach(group => {
		group.types = group.controls.map(key => types[key].Control)
	})

	provide('uploadOptions', props.uploadOptions)

	let data = reactive({
		activeControl: null,
		activeTab: 'control',
		device: 'pc'
	})

	provide('data', data)
	provide('formProps', props.formData.props)

	let defaultFormProps = {
		labelPosition: 'right',
		labelWidth: 100,
		size: 'default',
		customClass: '',
		cols: 12
	}

	if (props.formData.controls == undefined) {
		props.formData.controls = []
	}

	if (props.formData.props == undefined) {
		props.formData.props = defaultFormProps
	} else {
		props.formData.props = Object.assign(defaultFormProps, props.formData.props)
	}

	// #region 操作控件

	function setControls(control) {
		data.activeControl = control
	}

	// 清空控件
	function clearControl() {
		for (let i = props.formData.controls.length - 1; i >= 0; i--) {
			let control = props.formData.controls[i]
			if (!control.lock) {
				props.formData.controls.splice(i, 1)
				if (control == data.activeControl) {
					data.activeControl = null
				}
			}
		}
	}

	// #endregion

	// #region 查看JSON

	let formJsonVisible = ref(false)
	let formJson = ref(null)

	function viewFormJson() {
		formJson.value = getFormJson(true)
		formJsonVisible.value = true
	}

	function getFormJson(format) {
		return stringifyJson(props.formData)
	}

	// #endregion

	// 预览表单

	let previewVisible = ref(false)
	let formRenderer = ref(null)
	let previewData = reactive({
		formData: {},
		formModel: {}
	})

	function previewFrom() {
		previewData.formData = parseJson(stringifyJson(props.formData))
		let formModel = {}
		previewData.formData.controls.forEach(control => {
			if (control.props.defaultValue !== undefined)
				formModel[control.id] = control.props.defaultValue
		})
		previewData.formModel = formModel
		previewVisible.value = true
	}

	function onValidate() {
		formRenderer.value.validate(valid => {
			if (valid) {
				ElMessage.success('表单验证成功')
			} else {
				ElMessage.error('表单验证失败')
			}
		})
	}

	function resetFields() {
		formRenderer.value.resetFields()
	}

	// 预览查看model数据
	let modelJsonVisible = ref(false)
	let modelDescVisible = ref(false)
	let modelJson = ref(null)
	function viewModelJson() {
		modelJson.value = JSON.stringify(previewData.formModel, null, 2)
		modelJsonVisible.value = true
	}
	function viewModelDesc() {
		modelDescVisible.value = true
	}

	defineExpose({
		getFormJson,
		clearControl
	})
</script>

<template>
<div class="ep-form-designer">
	<main class="designer-main">
		<DesignerControlsPanel
			:control-groups="controlGroups"
			:form-data="formData"
			@click="setControls"
		/>

		<div class="designer-panel">
			<div class="form-toolbar">
				<div class="form-devices">
					<el-icon
						@click="data.device = device"
						class="icon"
						:class="{ 'is-selected': data.device == device }"
						v-for="device in ['pc', 'pad', 'mobile']"
					>
						<SvgIcon :name="device" />
					</el-icon>
				</div>

				<div class="form-opts">
					<el-popconfirm
						confirmButtonText="是"
						cancelButtonText="否"
						title="确定要清空组件吗?"
						@confirm="clearControl"
					>
						<template #reference>
							<el-button
								text
								type="primary"
								:disabled="formData.controls.length == 0"
							>
								<el-icon>
									<SvgIcon name="clear" />
								</el-icon>
								<span>清空</span>
							</el-button>
						</template>
					</el-popconfirm>
					<el-button
						text
						type="primary"
						@click="viewFormJson"
					>
						<el-icon>
							<SvgIcon name="json" />
						</el-icon>
						<span>查看JSON</span>
					</el-button>
					<el-button
						text
						type="primary"
						@click="previewFrom"
						:disabled="formData.controls.length == 0"
					>
						<el-icon>
							<SvgIcon name="preview" />
						</el-icon>
						<span>预览</span>
					</el-button>
				</div>
			</div>

			<div
				class="form-editor-panel"
				:class="[data.device]"
			>
				<el-form
					ref="form"
					class="elform"
					:label-position="formData.props.labelPosition"
					:label-width="formData.props.labelWidth"
					:size="formData.props.size"
					:class="[formData.props.customClass]"
					:status-icon="false"
					:show-message="false"
				>
					<FormItemRenderer
						:controls="formData.controls"
						:upload-options="uploadOptions"
					></FormItemRenderer>
				</el-form>
			</div>
		</div>

		<DesignerPropsPanel
			:data="data"
			:form-data="formData"
		/>
	</main>
</div>

<!-- 查看JSON -->
<el-dialog
	v-model="formJsonVisible"
	title="表单结构JSON"
	width="600px"
>
	<VAceEditor
		class="aceEditor"
		:readonly="true"
		v-model:value="formJson"
		lang="json"
		theme="chrome"
		style="height: 500px"
	/>
	<template #footer>
		<span class="dialog-footer">
			<el-button
				type="primary"
				@click="formJsonVisible = false"
			>
				关闭
			</el-button>
		</span>
	</template>
</el-dialog>

<!-- 表单预览 -->
<el-dialog
	v-model="previewVisible"
	destroy-on-close
	center
	fullscreen
	title="表单预览"
>
	<div class="form-preview-container">
		<FormRenderer
			ref="formRenderer"
			:formData="previewData.formData"
			:formModel="previewData.formModel"
		/>

		<el-dialog
			v-model="modelJsonVisible"
			destroy-on-close
			title="表单数据JSON"
			width="600px"
		>
			<VAceEditor
				class="aceEditor"
				:readonly="true"
				v-model:value="modelJson"
				lang="json"
				theme="chrome"
				style="height: 600px"
			/>
			<template #footer>
				<span class="dialog-footer">
					<el-button
						type="primary"
						@click="modelJsonVisible = false"
					>
						关闭
					</el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog
			v-model="modelDescVisible"
			destroy-on-close
			title="表单数据展示"
			width="600px"
		>
			<div style="height: 400px; overflow-y: auto">
				<FormViewer
					:form-data="previewData.formData"
					:form-model="previewData.formModel"
				/>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button
						type="primary"
						@click="modelDescVisible = false"
					>
						关闭
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>

	<template #footer>
		<div class="form-preview-footer">
			<el-button
				type="primary"
				@click="viewModelJson"
			>
				表单数据
			</el-button>
			<el-button
				type="primary"
				@click="viewModelDesc"
			>
				表单查看
			</el-button>
			<el-button
				type="primary"
				@click="onValidate"
			>
				验证表单
			</el-button>
			<el-button
				type="primary"
				@click="resetFields"
			>
				重置表单
			</el-button>
			<el-button
				type="primary"
				@click="previewVisible = false"
			>
				关闭
			</el-button>
		</div>
	</template>
</el-dialog>
</template>

<style
	lang="scss"
	scoped
>
	.ep-form-designer {
		@apply overflow-hidden w-full h-full bg-#f7f7f7;

		.designer-main {
			@apply flex overflow-hidden w-full h-full;
		}

		.designer-panel {
			@apply flex flex-col flex-grow items-center;

			.form-toolbar {
				@apply bg-white w-full px-3 py-1 flex justify-between items-center border-b-solid border-b-#ebeef5;

				.form-devices {
					@apply flex items-center space-x-2 text-lg text-gray-600;

					.is-selected {
						@apply bg-gray-200 text-blue-500;
					}

					.icon {
						@apply w-7 h-7 p-0.5 rounded cursor-pointer;
					}
				}

				.form-opts {
					@apply flex space-x-5;
				}
			}

			.form-editor-panel {
				@apply flex-1 overflow-auto box-border px-3 pt-3;
			}

			.elform {
				@apply flex flex-col min-h-full bg-white;

				:deep(.form-item-draggable) {
					@apply flex flex-grow flex-wrap overflow-y-auto content-start;
				}
			}

			.form-editor-panel.pc {
				width: 100%;
			}

			.form-editor-panel.mobile {
				// width: 375px;
				width: 414px;
			}

			.form-editor-panel.pad {
				width: 770px;
			}

			.form-item-wrap {
				@apply relative border border-dashed box-border p-2 cursor-move;

				.opt {
					@apply hidden absolute bg-blue-500 text-white z-10 bottom-0 right-0 p-2 space-x-2.5 items-center cursor-pointer;
				}

				.el-form-item__label {
					@apply cursor-move;
				}

				&:hover,
				&.is-selected {
					@apply bg-blue-50 border-blue-500 border-solid;

					.opt {
						@apply flex;
					}
				}
			}

			:deep(li.control-label) {
				@apply list-none justify-center text-blue-500 flex items-center px-20 py-5 border border-dashed w-full;

				span {
					@apply ml-1.5;
				}
			}
		}
	}

	.form-preview-container {
		@apply px-3 py-6 w-1/2 mx-auto items-center overflow-y-auto border border-solid border-gray-200;
		height: 700px;
	}

	.form-preview-footer {
		@apply text-center;
	}

	.aceEditor {
		@apply border;
	}
</style>
