import carsView from './carsView'

export default (targetElement, state) => {
	const carList = targetElement.querySelector(ulSelector.CAR_LIST)
	carList.replaceWith(carsView(carList, state))

	return element
}
