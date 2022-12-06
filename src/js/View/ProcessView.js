import View from './View';

export default class ProcessView extends View {
  constructor(target, model) {
    super(target, model);
    this.model.subscribe(this.render.bind(this));
  }

  #getCarTemplate({ name, position }) {
    return String.raw`<div class="mr-2">
    <div class="car-player">${name}</div>
    ${Array.from(
      { length: position },
      () => '<div class="forward-icon mt-2">⬇️️</div>'
    ).join('')}
    
    ${
      this.model.isFinished()
        ? ''
        : `<div class="mt-2 d-flex justify-center">
    <div class="relative spinner-container">
    <span class="d-flex material spinner"></span>
    </div>
    </div>`
    }
    </div>
`;
  }
  getTemplate() {
    const carsPosition = this.model.getCarNamesAndPositions();
    return String.raw`<div class="mt-4 d-flex">
    ${carsPosition
      .map((carPosition) => this.#getCarTemplate(carPosition))
      .join('')}
     
</div>`;
  }
}
