import CarNameFormSection from '../view/CarNameFormSection.js';
import TryCountFormSection from '../view/TryCountFormSection.js';
import PlaySection from '../view/PlaySection.js';
import WinnerSection from '../view/WinnerSection.js';
import RacingcarModel from '../model/RacingcarModel.js';
import { ALERT, GAME } from '../util/constants.js';
import { delay, moveCar } from '../util/service.js';

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

    this.racingcarModel = new RacingcarModel();

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

    this.winnerSection.on('@clickResetBtn', () => {
      this.onClickResetBtn();
    });
  }

  onClickResetBtn() {
    this.init();
    this.racingcarModel.resetGame();
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

    this.racingcarModel.setCars(carNames.split(',').map((name) => name.trim()));

    this.tryCountFormSection.show().focus();
  }

  async onSubmitTryCount({ data }) {
    const tryCount = data;
    this.tryCountFormSection.toggleDisableButton(true);

    this.racingcarModel.setTryCount(Number(tryCount));

    this.playSection.show().renderRacingCar(this.racingcarModel.carNames);

    await this.playGames();

    await this.setWinner();
  }

  async playGames() {
    for (const index in Array.from(
      { length: this.racingcarModel.tryCount },
      () => 0
    )) {
      this.racingcarModel.carNames.forEach((carName) => {
        this.playSection.renderSpinner(carName);
      });
      await delay(1000);

      this.racingcarModel.carNames.forEach((carName) => {
        this.playSection.renderSpinner(carName, false);
      });

      const movedCarNames = this.racingcarModel.carNames.filter((carName) => {
        const isMoved = moveCar();
        isMoved && this.playSection.renderRacingCarProgress(carName);
        return isMoved;
      });
      this.racingcarModel.setMoveCount(movedCarNames);
    }

    // while (count < this.racingcarModel.tryCount) {
    //   const movedCarNames = this.racingcarModel.carNames.filter((carName) => {
    //     const isMoved = moveCar();
    //     isMoved && this.playSection.renderRacingCarProgress(carName);
    //     return isMoved;
    //   });
    //   this.racingcarModel.setMoveCount(movedCarNames);
    //   count += 1;
    // }
  }

  async setWinner() {
    const maxCount = Math.max(
      ...this.racingcarModel.carInfo.map(({ count }) => count)
    );

    this.racingcarModel.setWinner(maxCount);

    this.winnerSection.show().renderWinner(this.racingcarModel.winner);

    await delay(2000);
    this.winnerSection.triggerAlert();
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
