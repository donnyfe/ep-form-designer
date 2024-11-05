import 'uno.css'
import FormDesigner from './components/designer/index.vue'
import FormRenderer from './components/renderer/index.vue'
import FormViewer from './components/viewer/index.vue'

// 提供局部导入使用
export { FormDesigner, FormRenderer, FormViewer }

// 提供全局导入使用

// 单独安装组件的方法
export function installFormDesigner(app) {
	app.component(FormDesigner.name, FormDesigner)
}

export function installFormRenderer(app) {
	app.component(FormRenderer.name, FormRenderer)
}

export function installFormViewer(app) {
	app.component(FormViewer.name, FormViewer)
}

// 全部安装组件的方法
export function install(app) {
	app
		.component(FormDesigner.name, FormDesigner)
		.component(FormRenderer.name, FormRenderer)
		.component(FormViewer.name, FormViewer)
}

// 导出默认对象,包含 install 方法,支持 app.use() 注册
export default {
	install
}
