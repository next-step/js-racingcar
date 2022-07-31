const getCarElement = (car) => {
	const { name, position } = car

	return `
    <li class="car-wrapper mr-2">
      <div class="car-player">${name}</div>
      <ul class="arrow-wrapper">
        ${position.map(getCarForwardElement)}
      </ul>
    </li>
  `
}

const getCarForwardElement = () => {
	return `
    <li class="forward-icon">
      ⬇️️
    </li>
  `
}

export default (targetElement, { cars }) => {
	const newCarList = targetElement.cloneNode(true)
	const carsElements = cars.map(getCarElement).join('')
	newCarList.innerHTML = carsElements

	return newCarList
}
