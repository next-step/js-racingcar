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

const validateCompetitionCount = function (competitionCount) {
	try {
		if (!competitionCount) {
			throw new Error(errorMessage.INVALID_CAR_TRY)
		}
		return true
	} catch (err) {
		catchError(err)
	}
}

export default {
	validateCarName,
	validateCompetitionCount,
}
