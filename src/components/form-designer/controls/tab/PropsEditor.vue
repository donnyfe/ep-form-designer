<script setup>
import SvgIcon from '../../svg-icon.vue'

let props = defineProps({
	control: Object,
	formProps: Object,
})

// 多选固定选项删除
const delTab = (index) => {
	props.control.props.columns.splice(index, 1)
}
// 多选固定选项增加
const addTab = () => {
	props.control.props.columns.push({
		label: `Tab${props.control.props.columns.length + 1}`,
		controls: []
	})
}
</script>

<template>
	<el-form label-width="90px">
		<el-form-item label="宽度">
			<el-slider class="w-11/12" :min="0" :max="formProps.cols" show-stops v-model="control.props.width"></el-slider>
		</el-form-item>
		<el-form-item label="标签页">
			<div class="tab-item" v-for="(item, index) in props.control.props.columns" :key="index">
				<el-col :span="12">
					<el-input v-model="item.label" placeholder="标签配置项"></el-input>
				</el-col>
				<el-col :span="2" :offset="1">
					<el-icon>
						<SvgIcon name="delete" @click="delTab(index, 'tabs')" />
					</el-icon>
				</el-col>
			</div>
		</el-form-item>
		<el-form-item>
			<el-button text type="primary" @click="addTab('tabs')">
				<el-icon>
					<SvgIcon name="plus" />
				</el-icon>
				增加标签
			</el-button>
		</el-form-item>
		<el-form-item label="自定义类">
			<el-input v-model="control.props.customClass" placeholder="请输入自定义class"></el-input>
		</el-form-item>
	</el-form>
</template>
<style lang="scss" scoped>
.tab-item {
	@apply flex justify-start items-center py-1;
}
</style>
