import view from './view.js'
import { getCars } from './model.js'

const state = {
	cars: getCars(),
}

const main = document.querySelector('#app')

window.requestAnimationFrame(() => {
	const newMain = view(main, state)
	main.replaceWith(newMain)
})
