import 'uno.css'
import FormDesigner from './components/designer/index.vue'
import FormRenderer from './components/renderer/index.vue'
import FormViewer from './components/viewer/index.vue'

FormDesigner.install = app => {
	app.component(FormDesigner.name, FormDesigner)
}

FormRenderer.install = app => {
	app.component(FormRenderer.name, FormRenderer)
}

FormViewer.install = app => {
	app.component(FormViewer.name, FormViewer)
}

// 提供局部导入使用
export { FormDesigner, FormRenderer, FormViewer }
