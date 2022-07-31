import { errorMessage } from './constant/message.js'
import { INPUT_CAR_NAME_MAX_LENGTH } from './constant/number.js'
import { fireError } from './utils.js'

const validateCarName = function (carName) {
	if (carName.length === 0) {
		fireError(errorMessage.INVALID_CAR_NAME)
		return false
	}
	if (carName.length > INPUT_CAR_NAME_MAX_LENGTH) {
		fireError(errorMessage.INVALID_CAR_NAME)
		return false
	} else {
		return true
	}
}

const validateCompetitionCount = function (competitionCount) {
	if (!competitionCount) {
		fireError(errorMessage.INVALID_CAR_TRY)
		return false
	} else {
		return true
	}
}

export default {
	validateCarName,
	validateCompetitionCount,
}
