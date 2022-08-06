import { racingGameStore } from './index.js'
import { errorMessage } from '../constant/message.js'

const saveFieldsetValue = function ({ fieldsetSelector, saveValue, stateKey }) {
	try {
		if (!!saveValue && !!fieldsetSelector) {
			fieldsetSelector.disabled = true
			racingGameStore[stateKey].setState(saveValue)
			racingGameStore[stateKey].freeze()
		}
		if (!saveValue) {
			throw new Error(errorMessage.INVALID_SAVE_VALUE)
		}
		if (!fieldsetSelector) {
			throw new Error(errorMessage.INVALID_FIELDSET_ELEMENT)
		}
	} catch (err) {
		console.error(err)
	}
}

export default saveFieldsetValue
