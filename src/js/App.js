import CarContainer from './components/CarContainer.js'
import NameForm from './components/NameForm.js'
import NumForm from './components/NumForm.js'
import Result from './components/Result.js'
import Component from './core/Component.js'
import { $get } from './utils/dom.js'

class App extends Component {
	constructor(selector) {
		super(selector)
	}

	mapState() {
		this.stateList = ['cars', 'num']
	}

	setElements() {
		this.$form = $get('form', this.$target)
		this.$sectionCar = $get('section.car', this.$target)
		this.$sectionResult = $get('section.result', this.$target)

		this.$nameForm = new NameForm().$target
		this.$numForm = new NumForm().$target
	}

	render() {
		this.$form.innerHTML = ''
		this.$sectionCar.innerHTML = ''
		this.$sectionResult.innerHTML = ''

		this.$form.appendChild(this.$nameForm)

		if (Object.keys(this.cars).length === 0) return
		this.$form.appendChild(this.$numForm)

		if (this.num === '') return
		const carContainer = new CarContainer({ num: this.num, cars: this.cars })
		this.$sectionCar.appendChild(carContainer.$target)

		const result = new Result()
		this.$sectionResult.appendChild(result.$target)
	}

	template() {
		return /* html */ `
      <div id="app">
        <section class="d-flex justify-center mt-5">
          <form></form>
        </section>
        <section class="car d-flex justify-center mt-5"></section>
        <section class="result d-flex justify-center mt-5"></section>
      </div>
    `
	}
}

export default App
