import Component from '../library/core/Component.js';

export default class GameProcess extends Component {
  mountTemplate() {
    this.$target.innerHTML = `
      <section class="mt-4">
        <div class="d-flex">
          ${this.props.cars
            .get()
            .reduce((acc, car) => acc + this.createCarProcessTemplate(car), '')}
        </div>
      </section>
    `;
  }

  createCarProcessTemplate(car) {
    return `
      <div class="car">
        <div class="car-player mr-2">${car.name}</div>
        ${'<div class="forward-icon mt-2">⬇️</div>'.repeat(car.position)}
        ${this.props.raceTimes.get() ? this.createSpinnerTemplate() : ''}
      </div>
    `;
  }

  createSpinnerTemplate() {
    return `
      <div class="d-flex justify-center mt-4">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
      </div>
    `;
  }
}
