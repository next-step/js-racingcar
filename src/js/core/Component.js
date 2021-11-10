import { store } from '../store/index.js'
import { $getElement } from '../utils/dom.js'

class Component {
	constructor(props = {}) {
		this.props = { ...props }

		this.mapState()
		this.mapActions()
		store.addComponent(this, this.stateList, this.actionList)
		this.$target = $getElement(this.template())

		this.setElements()
		this.setEvents()
		this.render()
		console.log(this)
	}

	mapState() {
		this.stateList = []
	}

	mapActions() {
		this.actionList = []
	}

	setElements() {}

	setEvents() {}

	render() {}

	template() {
		return ``
	}
}

export default Component
