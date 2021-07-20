import ForwardIcon from '../atoms/ForwardIcon.js'
import Spinner from '../atoms/Spinner.js'
import Component from '../core/Component.js'
import { FORWRAD, RANDOM_MAX, RANDOM_MIN } from '../utils/constants.js'
import { getRandom } from '../utils/random.js'

class Car extends Component {
	constructor(props) {
		super(props)
		this.score = 0
	}

	mapState() {
		this.stateList = ['num']
	}

	mapActions() {
		this.actionList = ['setCar']
	}

	render() {
		this.spinner = new Spinner()
		this.$target.appendChild(this.spinner.$target)
	}

	template() {
		return /* html */ `
			<div class="mr-2">
				<div class="car-player">${this.props.name}</div>
			</div>
		`
	}

	runCar() {
		this.forwardCar()
	}

	forwardCar() {
		const isForward = getRandom(RANDOM_MIN, RANDOM_MAX) >= FORWRAD

		if (!isForward) return

		this.$target.insertBefore(new ForwardIcon().$target, this.spinner.$target)
		this.score++
	}

	endRunCar() {
		this.setCar({ name: this.props.name, score: this.score })
		this.spinner.$target.remove()
	}
}

export default Car
