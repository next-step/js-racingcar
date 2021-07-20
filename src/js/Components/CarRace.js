import Component from '../Core/Component.js'

export default class CarRaceBoard extends Component {
  
  template() {
    const { carList } = this.props;
    console.log(carList)
    return `
      <div class="mt-4 d-flex">
        <div class="mr-2">
          ${carList.map(car => this.createRaceProcessTemplate(car)).join('')}
        </div>
      </div>
    `
  }

  createRaceProcessTemplate(car) {
    return `
      <div class="car-player">${car.name}</div>   
      ${'<div class="forward-icon mt-2">⬇️️</div>'.repeat(car.currentPos) 
        + car.isFinished ? '' : this.createSpinnerTemplate()        
      }
    `
  }


  createSpinnerTemplate() {
    return `
      <div class="d-flex justify-center mt-3">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
      </div>
    `
  }
}
