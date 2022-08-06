import { CAR_NAME_RULE, TRY_COUNT_LIMIT } from './constants.js';

export default class Controller {
  constructor(model, { carNameFormView, raceCountFormView, racingProgressView, racingResultView }) {
    this.model = model;
    this.carNameFormView = carNameFormView;
    this.raceCountFormView = raceCountFormView;
    this.racingProgressView = racingProgressView;
    this.racingResultView = racingResultView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.carNameFormView.on('@submit', ({ detail: carNames }) => this.onCarNameSubmit(carNames));
    this.raceCountFormView.on('@submit', ({ detail: tryCount }) => this.onRaceCountSubmit(tryCount));
    this.racingResultView.on('@reset', () => this.onReset());
  }

  onCarNameSubmit(carNames) {
    try {
      const cars = carNames.split(',').map((name) => name.trim());

      const isCarNameLengthValid = cars.every((name) => {
        return name.length >= CAR_NAME_RULE.MIN_LENGTH && name.length <= CAR_NAME_RULE.MAX_LENGTH;
      });
      const isCarNameDuplicated = new Set(cars).size !== cars.length;

      if (!isCarNameLengthValid) throw new Error('자동차 이름은 1자 이상, 5자 이하여야 합니다.');
      if (isCarNameDuplicated) throw new Error('자동차 이름은 중복될 수 없습니다.');

      this.model.storeCars(cars);
      this.render();
    } catch (err) {
      window.alert(err.message);
    }
  }

  onRaceCountSubmit(tryCount) {
    try {
      if (tryCount > TRY_COUNT_LIMIT) throw new Error('최대 시도 횟수는 30회 입니다.');
      this.model.race(tryCount);
      this.render();
    } catch (err) {
      window.alert(err.message);
    }
  }

  onReset() {
    this.model.reset();
    this.render();
  }

  render() {
    this.carNameFormView.show(this.model.cars);
    this.raceCountFormView.show(this.model.cars, this.model.tryCount);
    this.racingProgressView.show(this.model.cars, this.model.tryCount);
    this.racingResultView.show(this.model.cars, this.model.tryCount);
  }
}
