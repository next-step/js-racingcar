import { errorMessage } from '../constant/message.js'

class State {
	#state
	#observers
	#isStateWritable

	constructor(state) {
		this.#state = state
		this.#observers = new Set()
		this.#isStateWritable = true
	}

	freeze() {
		this.#isStateWritable = false
	}

	getState() {
		return this.#state
	}

	setState(newState) {
		try {
			if (!this.#isStateWritable) {
				throw new Error(errorMessage.FROZEN_STATE)
			}
			console.log(newState)
			this.#state = newState
			this.publish()
		} catch (err) {
			console.error(err)
		}
	}

	subscribe(func) {
		this.#observers.add(func)
	}

	publish() {
		this.#observers.forEach((func) => func())
	}
}

export default State
