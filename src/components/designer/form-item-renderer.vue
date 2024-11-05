<script setup>
	import { inject } from 'vue'
	import draggable from 'vuedraggable/src/vuedraggable'
	import SvgIcon from '@/components/icons/index.vue'
	import types from '../controls'
	import { randomWord, stringifyJson, parseJson } from '@/utils'

	//组件的属性
	let props = defineProps({
		controls: {
			type: Array,
			required: true
		},
		uploadOptions: {
			type: Object,
			default: {
				action: '',
				getHeaders: () => ({}),
				getFileHook: (response, file) => ({ name: file, url: response.url })
			}
		}
	})

	let data = inject('data')
	let formProps = inject('formProps')

	// 操作控件

	// 复制控件
	function handleCopy(originControl) {
		let control = parseJson(stringifyJson(originControl))
		control.id = randomWord(false, 9)
		control.lock = false
		props.controls.push(control)
	}

	// 拖动控件
	function onChange(evt) {
		if (evt.added) {
			data.activeControl = evt.added.element
		} else if (evt.moved) {
			data.activeControl = evt.moved.element
		}
	}

	// 选中控件
	function handleSelect(control) {
		data.activeControl = control
	}

	// 删除控件
	function handleDelete(control, index) {
		if (data.activeControl != null && control.id == data.activeControl.id) {
			data.activeControl = null
		}
		props.controls.splice(index, 1)
	}
</script>

<template>
	<draggable
		:list="controls"
		item-key="id"
		class="form-item-draggable"
		@change="onChange"
		:sort="true"
		:group="{ name: 'com', pull: true, put: true }"
	>
		<template #item="{ element, index }">
			<div
				@click.stop="handleSelect(element)"
				class="form-item-wrap"
				:class="{ 'is-selected': data.activeControl == element }"
				:style="{ width: (element.props.width * 100) / formProps.cols + '%' }"
			>
				<el-form-item
					v-if="element.type != 'tab'"
					:class="element.props.customClass"
					:prop="element.id"
					:label-width="
						element.props.showLabel ? element.props.labelWidth || formProps.labelWidth : '0'
					"
					:label="element.props.showLabel ? element.props.label : ' '"
					:rules="element.rules"
				>
					<component
						:is="types[element.type].Renderer"
						:control="element"
					/>
				</el-form-item>

				<component
					v-if="element.type == 'tab'"
					:is="types[element.type].Renderer"
					:control="element"
				/>

				<div
					class="opt"
					v-if="data.activeControl == element"
				>
					<el-icon @click.stop="handleCopy(element)">
						<SvgIcon name="copy" />
					</el-icon>
					<el-icon
						v-if="!element.lock"
						@click.stop="handleDelete(element, index)"
					>
						<SvgIcon name="delete" />
					</el-icon>
				</div>
			</div>
		</template>
	</draggable>
</template>

<style lang="scss" scoped>
	.form-item-wrap {
		@apply relative border border-dashed border-blue-500 box-border p-2 cursor-move;

		.opt {
			@apply flex absolute bg-blue-500 text-white z-10 bottom-0 right-0 p-2 space-x-2.5 items-center cursor-pointer;
		}

		.el-form-item__label {
			@apply cursor-move;
		}

		&.is-selected {
			@apply bg-blue-50 border-blue-500 border-solid;

			.opt {
				@apply flex;
			}
		}
	}
</style>
