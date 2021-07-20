import App from './App.js'
import { $get } from './utils/dom.js'

window.addEventListener('DOMContentLoaded', () => {
	const $app = $get('#app')
	document.body.appendChild(new App().$target)
	$app.remove()
})
