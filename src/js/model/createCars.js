import { Car } from './Car.js'
import validator from '../validator.js'

export const createCars = function (carNameInput) {
	const carNames = carNameInput.split(',').map((carName) => carName.trim())

	if (carNames.every((carName) => validator.validateCarName(carName))) {
		const cars = carNames.map((name) => new Car(name))
		return cars
	}
}
