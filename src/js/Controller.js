export default class Controller {
  constructor(model, views) {
    this.model = model;
    this.views = views;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    const { carNameFormView, raceCountFormView, racingResultView } = this.views;
    carNameFormView.on('@submit', ({ detail: carNames }) => this.onCarNameSubmit(carNames));
    raceCountFormView.on('@submit', ({ detail: tryCount }) => this.onRaceCountSubmit(tryCount));
    racingResultView.on('@reset', () => this.onReset());
  }

  onCarNameSubmit(carNames) {
    this.model.registerCars(carNames);
    this.render();
    this.views.raceCountFormView.inputElement.focus();
  }

  onRaceCountSubmit(tryCount) {
    this.model.startRacing(tryCount);
    this.render();
  }

  onReset() {
    this.model.reset();
    this.render();
  }

  render() {
    const { cars, tryCount } = this.model;
    const { carNameFormView, raceCountFormView, racingProgressView, racingResultView } = this.views;

    carNameFormView.show(cars);
    raceCountFormView.show(cars, tryCount);
    racingProgressView.show(cars, tryCount);
    racingResultView.show(cars, tryCount);
  }
}
