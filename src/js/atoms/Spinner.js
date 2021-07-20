import Component from '../core/Component.js'

class Spinner extends Component {
	constructor() {
		super()
	}

	template() {
		return /* html */ `
      <div class="d-flex justify-center mt-3">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
      </div>
		`
	}
}

export default Spinner
