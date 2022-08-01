import { ulSelector } from '../constant/selector.js'
import { $ } from '../utils.js'

export const toggleCarsView = function (cars) {
	$(ulSelector.CAR_LIST).hidden = !cars
}
