<script setup>
import { inject } from "vue";
import types from "../controls";

//组件的属性
let props = defineProps({
	controls: {
		type: Array,
		required: true,
	},
	uploadOptions: {
		type: Object,
		default: {
			action: "",
			getHeaders: () => ({}),
			getFileHook: (response, file) => ({ name: file, url: response.url }),
		},
	},
	formModel: {
		type: Object,
		default: {},
		required: true,
	}
});
let formProps = inject("formProps");

</script>

<template>
	<div v-for="(element, index) in controls" :key="index" class="form-item-wrap"
		:style="{ 'width': (element.props.width * 100 / formProps.cols) + '%' }">
		<el-form-item v-if="element.type != 'tab'" :class="element.props.customClass" :prop="element.id"
			:label-width="element.props.showLabel ? (element.props.labelWidth || formProps.labelWidth) : '0'"
			:label="element.props.showLabel ? element.props.label : ' '" :rules="element.rules">
			<component :is="types[element.type].Renderer" :control="element" :model="formModel" />
		</el-form-item>
		<component v-if="element.type == 'tab'" :is="types[element.type].Renderer" :control="element" :model="formModel" />
	</div>
</template>

<style lang="scss" scoped>
.form-item-wrap {
	padding-right: 4px;
}

@media (max-width: 767px) {
	.form-item-wrap {
		width: 100% !important;
		padding-right: 0px;
	}
}
</style>
