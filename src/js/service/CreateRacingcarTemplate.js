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

  createCarPlayer(carNames) {
    return carNames
      .map(
        (carName) => `<div class="car mr-2">
                  ${this.createCarPlayerTemplate(carName)}
                  ${this.createSpinnerTemplate()}
                </div>`
      )
      .join('');
  }
}

export default CreateTemplate;
