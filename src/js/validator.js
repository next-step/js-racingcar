import { INPUT_CAR_NAME_MAX_LENGTH } from './constant/number.js'

const catchError = function (error) {
	console.error(error)
	window.alert(error.message)
}

const isValidCarName = function (carName) {
	if (!carName) {
		return false
	}
	if (carName.length === 0) {
		return false
	}
	if (carName.length > INPUT_CAR_NAME_MAX_LENGTH) {
		return false
	}
	return true
}

const isValidRaceCount = function (raceCount) {
	if (!raceCount) {
		return false
	}
	if (raceCount <= 0) {
		return false
	}
	if (raceCount >= Number.MAX_SAFE_INTEGER) {
		return false
	}
	return true
}

export default {
	catchError,
	isValidCarName,
	isValidRaceCount,
}
