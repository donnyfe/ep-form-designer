import BaseControl from '../BaseControl'
import Renderer from './Renderer.vue'
import PropEditor from './PropsEditor.vue'

class Control extends BaseControl {
	constructor() {
		super('text', '文本')
		this.props = {
			width: 12,
			showLabel: true,
			labelWidth: undefined,
			label: '文本',
			content: '显示的文本',
			customClass: ''
		}
	}
}
Control.type = 'text'
Control.label = '文本'
export default { Control, Renderer, PropEditor, Viewer: Renderer }
