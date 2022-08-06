import validator from '../validator.js'
import { errorMessage } from '../constant/message.js'

const createValidRaceCount = function (raceCountInputNumber) {
	try {
		if (validator.isValidRaceCount(raceCountInputNumber)) {
			return raceCountInputNumber
		}
		if (raceCountInputNumber <= 0) {
			throw new Error(errorMessage.SMALL_RACE_COUNT)
		}
		if (raceCountInputNumber >= Number.MAX_SAFE_INTEGER) {
			throw new Error(errorMessage.BIG_RACE_COUNT)
		}
		if (!raceCountInputNumber) {
			throw new Error(errorMessage.EMPTY_RACE_COUNT)
		}
	} catch (err) {
		validator.catchError(err)
		return null
	}
}

export default createValidRaceCount
