import { errorMessage } from '../constant/message.js'
import { fireError } from '../utils.js'

export const validateCarTry = function (carTry) {
	if (!carTry) {
		fireError(errorMessage.INVALID_CAR_TRY)
		return false
	} else {
		return true
	}
}
