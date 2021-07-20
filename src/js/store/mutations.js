export default {
	SET_CARS(state, newCars) {
		state.cars = newCars
	},
	SET_CAR(state, { name, score }) {
		state.cars[name] = score
	},
	SET_NUM(state, newNum) {
		state.num = newNum
	},
	SET_WINNERS(state, newWinners) {
		state.winners = newWinners
	},
}
