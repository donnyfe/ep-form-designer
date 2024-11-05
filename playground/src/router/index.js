import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'form-designer',
			component: () => import('../views/FormDesigner.vue')
		},
		{
			path: '/form-render',
			name: 'form-render',
			component: () => import('../views/FormRender.vue')
		},
		{
			path: '/form-viewer',
			name: 'form-viewer',
			component: () => import('../views/FormViewer.vue')
		}
	]
})

export default router
