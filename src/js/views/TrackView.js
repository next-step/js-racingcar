import View from './View.js';

class TrackView extends View {
  createWrapperTemplate(...params) {
    return `
    <div class="mr-2">
      ${params.join('')}
    </div>
    `;
  }

  createCarNameTemplate(car) {
    return `
    <div class="car-player">
      ${car.name}
    </div>
    `;
  }

  createMoveTemplate() {
    return `
    <div class="forward-icon mt-2">⬇️</div>
    `;
  }

  createLoadingTemplate() {
    return `
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
    `;
  }

  render(cars) {
    this._target.innerHTML = `
    <div class="mt-4 d-flex">
    ${cars
      .map((car) =>
        this.createWrapperTemplate(
          this.createCarNameTemplate(car),
          car.history
            .filter((action) => action === 'move')
            .map(() => this.createMoveTemplate())
            .join(''),
          this.createLoadingTemplate()
        )
      )
      .join('')}
    </div>
    `;
  }
}

export default TrackView;
