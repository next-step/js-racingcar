import CarNameFormSection from '../view/CarNameFormSection.js';
import TryCountFormSection from '../view/TryCountFormSection.js';
import PlaySection from '../view/PlaySection.js';
import WinnerSection from '../view/WinnerSection.js';
import RacingcarModel from '../model/RacingcarModel.js';
import { ALERT, GAME } from '../util/constants.js';

export default class MainController {
  constructor({
    carNameFormSection,
    tryCountFormSection,
    playSection,
    winnerSection
  }) {
    this.carNameFormSection = new CarNameFormSection(carNameFormSection);
    this.tryCountFormSection = new TryCountFormSection(tryCountFormSection);
    this.playSection = new PlaySection(playSection);
    this.winnerSection = new WinnerSection(winnerSection);

    this.racingCarModel = new RacingcarModel();

    this.init();
    this.bindEvents();
  }

  init() {
    this.carNameFormSection.show().init();
    this.tryCountFormSection.hide().init();
    this.playSection.hide().render();
    this.winnerSection.hide().render();
  }

  bindEvents() {
    this.carNameFormSection.on('@submitCarNames', ({ detail }) =>
      this.onSubmitCarNames(detail)
    );

    this.tryCountFormSection.on('@submitTryCount', ({ detail }) =>
      this.onSubmitTryCount(detail)
    );
  }

  onSubmitCarNames({ data }) {
    const carNames = data.trim();

    if (!this.isValidCarCount(carNames)) {
      alert(ALERT.MIN_PEOPLE_LENGTH);
      return;
    }

    if (!this.isValidCarName(carNames)) {
      alert(ALERT.MAX_NAME_LENGTH);
      return;
    }

    this.carNameFormSection.toggleDisableButton(true);

    this.racingCarModel.setCars(carNames.split(',').map((name) => name.trim()));

    this.tryCountFormSection.show().focus();
  }

  onSubmitTryCount({ data }) {
    const tryCount = data;
    this.tryCountFormSection.toggleDisableButton(true);

    this.racingCarModel.setTryCount(Number(tryCount));

    this.playSection.show().renderRacingCar(this.racingCarModel.carNames);
  }

  isValidCarName(carNames) {
    return carNames
      .split(',')
      .every((carName) => carName.trim().length <= GAME.MAX_NAME_LENGTH);
  }

  isValidCarCount(carNames) {
    return carNames.split(',').length > GAME.MIN_PARTICIPANT;
  }
}
