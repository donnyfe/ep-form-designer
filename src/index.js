import { createApp } from 'vue'
import App from './App.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'uno.css'

const app = createApp(App)

app.use(ElementPlus, {
	locale: zhCn,
	size: 'default'
})

app.mount('#app')
