import { errorMessage } from './constant/message.js'
import { INPUT_CAR_NAME_MAX_LENGTH } from './constant/number.js'

const catchError = function (error) {
	console.error(error)
	window.alert(error.message)
}

const isValidateCarName = function (carName) {
	if (carName.length === 0) {
		return false
	}
	if (carName.length > INPUT_CAR_NAME_MAX_LENGTH) {
		return false
	}
	return true
}

const validateRaceCount = function (raceCount) {
	try {
		if (!raceCount) {
			throw new Error(errorMessage.SMALL_RACE_COUNT)
		}
		if (raceCount >= Number.MAX_SAFE_INTEGER) {
			throw new Error(errorMessage.BIG_RACE_COUNT)
		}
		return true
	} catch (err) {
		catchError(err)
	}
}

export default {
	catchError,
	isValidateCarName,
	validateRaceCount,
}
