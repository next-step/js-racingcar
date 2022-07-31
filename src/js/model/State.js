class State {
	#state
	#observers

	constructor(state) {
		this.#state = state
		this.#observers = new Set()
	}

	getState() {
		return this.#state
	}

	setState(newState) {
		this.#state = newState
		this.publish()
	}

	subscribe(func) {
		this.#observers.add(func)
	}

	publish() {
		this.#observers.forEach((func) => func())
	}
}

export { State }
