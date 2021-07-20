import Component from '../core/Component.js'
import Car from './Car.js'

class CarContainer extends Component {
	constructor(props) {
		super(props)
		this.count = 0
	}

	mapActions() {
		this.actionList = ['setWinners']
	}

	render() {
		this.carComponents = []
		this.setCarComponents()

		this.runInterval = setInterval(() => {
			this.runCars()
		}, 1000)
	}

	template() {
		return `
			<div class="car-container mt-4 d-flex"></div>
		`
	}

	setCarComponents() {
		this.$target.innerHTML = ''

		Object.keys(this.props.cars).map((name) => {
			const newCar = new Car({ name })
			this.$target.appendChild(newCar.$target)
			this.carComponents.push(newCar)
		})
	}

	runCars() {
		this.count++
		this.carComponents.forEach((carComponent) => {
			carComponent.runCar()
		})

		if (this.count !== this.props.num) return
		this.endRunCars()
	}

	endRunCars() {
		clearInterval(this.runInterval)
		this.carComponents.forEach((carComponent) => {
			carComponent.endRunCar()
		})

		this.setWinners()
	}
}

export default CarContainer
