import { errorMessage } from './constant/message.js'
import { INPUT_CAR_NAME_MAX_LENGTH } from './constant/number.js'

const catchError = function (message) {
	console.error(message)
	window.alert(message)
}

const validateCarName = function (carName) {
	try {
		if (carName.length === 0) {
			throw new Error(errorMessage.INVALID_CAR_NAME)
		}
		if (carName.length > INPUT_CAR_NAME_MAX_LENGTH) {
			throw new Error(errorMessage.INVALID_CAR_NAME)
		}
		return true
	} catch (err) {
		catchError(err)
	}
}

const validateRaceCount = function (raceCount) {
	try {
		if (!raceCount) {
			throw new Error(errorMessage.INVALID_RACE_COUNT)
		}
		return true
	} catch (err) {
		catchError(err)
	}
}

export default {
	catchError,
	validateCarName,
	validateRaceCount,
}
