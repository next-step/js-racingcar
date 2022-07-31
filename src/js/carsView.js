let template

const createNewCarNode = () => {
	if (!template) {
		template = document.getElementById('car-item')
	}

	return template.content.firstElementChild.cloneNode(true)
}

const getCarElement = (car) => {
	const { name } = car
	const element = createNewCarNode()

	element.querySelector('#car-name').textContent = name

	return element
}

export default (targetElement, { cars }) => {
	const newCarList = targetElement.cloneNode(true)

	newCarList.innerHTML = ''

	cars.map(getCarElement).forEach((element) => {
		newCarList.appendChild(element)
	})

	return newCarList
}
