import { getCarComponent, paintCar, showRaceSection } from '../view/car.js'

export const sendCarsToView = function (cars) {
	const carsComponent = cars.reduce((acc, cur) => {
		return acc + getCarComponent(cur.name, cur.position).outerHTML
	}, '')
	showRaceSection()
	paintCar(carsComponent)
}
