import { getCars } from './model.js'
import carsView from './carsView.js'

import registry from './registry.js'

import { applyDiff } from './diff.js'

registry.add('cars', carsView)

const state = {
	cars: getCars(),
}

const render = () => {
	window.requestAnimationFrame(() => {
		const main = document.querySelector('#app')
		const newMain = registry.renderRoot(main, state)
		applyDiff(document.body, main, newMain)
	})
}
