import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/base.css'
import './assets/main.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { FormDesigner, FormRenderer, FormViewer } from '@idonnyfe/ep-form-designer'
import '@idonnyfe/ep-form-designer/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(FormDesigner.install)
app.use(FormRenderer.install)
app.use(FormViewer.install)

app.mount('#app')
