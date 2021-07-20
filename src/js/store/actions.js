export default {
	setCars({ commit }, carsStr) {
		const newCars = carsStr.split(',').reduce((cars, car) => {
			const name = car.trim()

			if (!name) return cars

			cars[name] = 0
			return cars
		}, {})
		commit('SET_CARS', newCars)
	},
	setCar({ commit }, { name, score }) {
		commit('SET_CAR', { name, score })
	},
	setNum({ commit }, newNum) {
		commit('SET_NUM', newNum)
	},
	setWinners({ commit, state }) {
		const highScore = Math.max(...Object.values(state.cars))
		const newWinners = Object.keys(state.cars).filter(
			(name) => state.cars[name] === highScore
		)

		commit('SET_WINNERS', newWinners)
	},
	initStore({ commit }) {
		commit('SET_NUM', '')
		commit('SET_CARS', {})
		commit('SET_WINNERS', [])
	},
}
