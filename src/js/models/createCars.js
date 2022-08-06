import Car from './Car.js'
import validator from '../validator.js'
import { errorMessage } from '../constant/message.js'
import { INPUT_CAR_NAME_MAX_LENGTH } from '../constant/number.js'

const createCars = function (carNameInput) {
	const carNames = carNameInput.split(',').map((carName) => carName.trim())
	const cars = []
	try {
		for (const carName of carNames) {
			if (validator.isValidCarName(carName)) {
				cars.push(new Car(carName))
				continue
			}
			if (carName.length === 0 || carName.length > INPUT_CAR_NAME_MAX_LENGTH) {
				throw new Error(errorMessage.INVALID_CAR_NAME)
			}
		}
	} catch (err) {
		validator.catchError(err)
		return []
	}

	return cars
}

export default createCars
