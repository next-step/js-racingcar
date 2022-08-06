class CreateTemplate {
  getRacingList(carNames) {
    return carNames.map((carName) => this.createRacingTemplate(carName)).join('');
  }

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
    return this.getRacingList(carNames);
  }

  createRacingResultTemplate(result) {
    return `<div>
            <h2>🏆 최종 우승자: ${result} 🏆</h2>
            <div class="d-flex justify-center">
              <button id="replay" type="button" class="btn btn-cyan">다시 시작하기</button>
            </div>
          </div>`;
  }
}

export default CreateTemplate;
