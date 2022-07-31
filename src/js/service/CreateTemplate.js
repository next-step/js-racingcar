class CreateTemplate {
  createCarPlayerTemplate(carName) {
    return `<div class="car-player">${carName}</div>`;
  }

  createForwardTemplate() {
    return `<div class="forward-icon mt-2">⬇️</div>`;
  }

  createSpinnerTemplate() {
    return `<div class="spinners d-flex justify-center mt-3">
                    <div class="relative spinner-container">
                      <span class="material spinner"></span>
                    </div>
                  </div>`;
  }

  createRacingTemplate(carName) {
    return `<div class="car mr-2">
                  ${this.createCarPlayerTemplate(carName)}
                  ${this.createSpinnerTemplate()}
                </div>
`;
  }

  createRacingListTemplate(carNames) {
    return carNames.map((carName) => this.createRacingTemplate(carName)).join('');
  }
}

export default CreateTemplate;
