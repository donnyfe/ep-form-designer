<script setup lang="ts">
	import { ref } from 'vue'
	import draggable from 'vuedraggable/src/vuedraggable'
import SvgIcon from '@/components/icons/index.vue'

	let props = defineProps({
		controlGroups: {
			type: Array,
			required: true
		},
		formData: {
			type: Object,
			required: true
		}
	})

	// 默认展开所有折叠面板
	const groupNames = props.controlGroups.map(group => group.name)
	const activeNames = ref(groupNames)

	let emit = defineEmits(['click'])

	// 添加控件
	function addControls(ctlType) {
		let control = new ctlType()
		props.formData.controls.push(control)
		emit('click', control)
	}

	// 克隆控件
	function clone(ctlType) {
		let control = new ctlType()
		return control
	}
</script>

<template>
	<div class="designer-controls-panel">
		<el-scrollbar>
			<el-collapse v-model="activeNames">
				<el-collapse-item
					class="control-title"
					:title="group.name"
					:name="group.name"
					v-for="(group, index) in controlGroups"
					:key="index"
				>
					<draggable
						class="control-group"
						:list="group.types"
						item-key="type"
						tag="ul"
						:clone="clone"
						:sort="false"
						:group="{ name: 'com', pull: 'clone', put: false }"
					>
						<template #item="{ element }">
							<li
								class="control-label"
								@click="addControls(element)"
							>
								<el-icon>
									<SvgIcon :name="element.type" />
								</el-icon>
								<span>{{ element.label }}</span>
							</li>
						</template>
					</draggable>
				</el-collapse-item>
			</el-collapse>
		</el-scrollbar>
	</div>
</template>

<style lang="scss" scoped>
	.designer-controls-panel {
		@apply space-y-5 z-10 text-gray-600 text-sm bg-white shadow box-border flex-shrink-0;
		width: 260px;

		.control-title {
			@apply px-2;

			span {
				@apply ml-1;
			}
		}

		.control-group {
			@apply grid grid-cols-2 gap-y-1 gap-x-1.5 px-4;
		}

		.control-label {
			@apply bg-gray-100 text-sm text-gray-600 px-2 py-2 box-border flex items-center border border-dashed border-transparent;

			&:hover {
				@apply border-blue-500 text-blue-500 cursor-move;
			}

			span {
				@apply ml-1.5;
			}
		}
	}
</style>
