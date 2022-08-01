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
		if (this.#isStateWritable) {
			this.#state = newState
			this.publish()
		}
	}

	subscribe(func) {
		this.#observers.add(func)
	}

	publish() {
		this.#observers.forEach((func) => func())
	}
}

export { State }
