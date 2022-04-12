import { Constants } from '../constants/constants.js';
import { Validator, getRandomNumber, isMoveForwardNumber } from '../util/Utils.js';

export default class RacingController {
  constructor(racingModel, inputView, trackView, resultView) {
    this.racingModel = racingModel;
    this.inputView = inputView;
    this.trackView = trackView;
    this.resultView = resultView;
    this.registerCarEventListener();
  }

  registerCarEventListener() {
    const carNamesSubmit = document.querySelector('#car-names-submit');
    const tryCountSubmit = document.querySelector('#try-count-submit');

    carNamesSubmit.addEventListener('click', () => this.submitCarNames());
    tryCountSubmit.addEventListener('click', () => this.submitTryCount());
  }

  submitCarNames() {
    const carNamesInput = document.querySelector('#car-names-input').value;
    const carNames = carNamesInput.split(',').map(name => name.trim());

    if (carNames.every(Validator.isValidCarName)) {
      alert('자동차 이름은 최소 1글자에서 최대 5글자까지 입력해주세요.');
    }

    this.racingModel.carNames = carNames;
    this.inputView.showRacingTryCount();
  }

  submitTryCount() {
    const tryCountInput = document.querySelector('#try-count-input').value;

    if (Validator.isInvalidTryCount(tryCountInput)) {
      alert('시도 횟수는 1번 이상, 10번 이하여야 합니다.');
      return;
    }

    this.racingModel.tryCount = tryCountInput;
    this.startRace();
  }

  // todo : 경주 시작
  startRace() {
    const { carNames } = this.racingModel;
    let count = Constants.INITIAL_TRY_COUNT;

    this.trackView.renderRacingCars(carNames);
    this.trackView.renderLoading();

    const timeIntervalId = setInterval(() => {
      carNames.forEach(car => {
        if (isMoveForwardNumber(getRandomNumber())) {
          this.trackView.renderMoveForward(car);
        }
      });

      count += Constants.INCREMENT_PER_TRY;

      if (count > this.racingModel.tryCount) {
        this.trackView.removeLoading();
        clearInterval(timeIntervalId);
        this.resultView.showRacingResult();
      }
    }, Constants.MILLISECONDS_PER_TRY);
  }
}
