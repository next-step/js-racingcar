import { getCars } from './model.js'
import carsView from './carsView.js'

import registry from './registry.js'

registry.add('cars', carsView)

const state = {
	cars: getCars(),
}

window.requestAnimationFrame(() => {
	const main = document.querySelector('#app')
	const newMain = registry.renderRoot(main, state)
	main.replaceWith(newMain)
})
