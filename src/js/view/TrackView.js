export default class TrackView {
  constructor() {
    this.racingTrack = document.querySelector('#racing-track');
    this.racingResult = document.querySelector('#racing-result');

    this.moveForwardTemplate =
      /* HTML */
      `<div class="forward-icon mt-2">⬇️️</div>`;
  }

  racingCarTemplate(carName) {
    return /* HTML */ `<div class="mr-2 racing-car">
      <div class="car-player" id=${carName}>${carName}</div>

      <div class="draw-random-number">
        <div class="d-flex justify-center mt-3">
          <div class="relative spinner-container">
            <span class="material spinner"></span>
          </div>
        </div>
      </div>
    </div>`;
  }

  showRacingTrack() {
    document.querySelector('#racing-track').style.display = '';
  }

  renderRacingCars(carNames) {
    const racingCarTemplates = [];

    carNames.forEach(carName => {
      racingCarTemplates.push(this.racingCarTemplate(carName));
    });

    this.racingTrack.firstElementChild.innerHTML = racingCarTemplates.join('');

    this.showRacingTrack();
  }

  renderLoading() {
    document.querySelectorAll('.draw-random-number').forEach(element => {
      element.style.display = '';
    });
  }

  removeLoading() {
    document.querySelectorAll('.draw-random-number').forEach(element => {
      element.style.display = 'none';
    });
  }

  renderMoveForward(car) {
    document.querySelector(`#${car}`).insertAdjacentHTML('afterend', this.moveForwardTemplate);
  }
}
