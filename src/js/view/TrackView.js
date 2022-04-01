export default class TrackView {
  constructor() {
    this.racingTrack = document.querySelector('#racing-track');
    this.racingResult = document.querySelector('#racing-result');

    // todo : 여기에서 display: none 하니까 페이지 로딩될때 영역이 살짝 보였다가 사라짐.
    // todo : 애초에 index.html 상에 display: none 을 해야할듯.
    this.racingTrack.style.display = 'none';
    this.racingResult.style.display = 'none';

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
