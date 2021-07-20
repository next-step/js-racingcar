import Component from '../Core/Component.js'

export default class CarRaceBoard extends Component {
  
  template() {
    const { carList = []} = this.props;
    return `
      <div class="mt-4 d-flex">
          ${carList.map(car => this.createRaceProcessTemplate(car)).join('')}
      </div>
    `
  }

  createRaceProcessTemplate(car) {
    const { currentCount, attemptNum } = this.props;
    return `
      <div class="mr-2">
        <div class="car-player">${car.name}</div>   
        ${'<div class="forward-icon mt-2">⬇️️</div>'.repeat(car.currentPos)
        + (currentCount !== attemptNum ? this.createSpinnerTemplate() : '')
      }
      </div>
    `
  }

  createSpinnerTemplate() {
    return `
      <div class="mr-2">
        <div class="d-flex justify-center mt-3">
          <div class="relative spinner-container">
            <span class="material spinner"></span>
          </div>
        </div>
      </div>
    `
  }

  setState(newState) {
    this.props = newState;
    this.render()
  }

}
