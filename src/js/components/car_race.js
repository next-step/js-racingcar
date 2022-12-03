import { CAR, DICE } from '../const.js';
import { $, filledArray, getRandomInt } from '../utils.js';
import Component from './component.js';

const CAR_RACE_STATUS_HTML = {
  [CAR.RACE_STATUS.LOADING]:
    '<div id="spinner" class="d-flex justify-center mt-3">' +
    '<div class="relative spinner-container">' +
    '<span class="material spinner"></span>' +
    '</div></div>',
  [CAR.RACE_STATUS.GO]: '<div class="forward-icon mt-2">⬇️️</div>',
  [CAR.RACE_STATUS.STOP]: '',
};

class CarRace extends Component {
  constructor($target, model) {
    super($target, model);
    this.carRaceSection = $('#car-race-section');
    this.carRaceWrapper = $('#car-race-wrapper');
    this.result = {};
  }

  computeCarRace(carName, carStatus) {
    if (this.result[carName]) {
      this.result[carName].push(carStatus);
    } else {
      this.result[carName] = [carStatus];
    }
  }

  getCarRaceStatus() {
    const randomCount = getRandomInt(DICE.TOTAL);

    if (randomCount >= DICE.SEPARATOR_NUMBER) {
      return CAR.RACE_STATUS.GO;
    }

    return CAR.RACE_STATUS.STOP;
  }

  renderCarRaceHeader() {
    const { carNames } = this.model;

    carNames.forEach(
      (carName) =>
        (this.carRaceWrapper.innerHTML += `<div id="car-${carName}"><div class="car-player">${carName}</div></div>`)
    );
  }

  renderCarRaceRow() {
    const { carNames } = this.model;

    carNames.forEach((carName) => {
      const carStatus = this.getCarRaceStatus();
      this.computeCarRace(carName, carStatus);
      $(`#car-${carName}`).innerHTML += CAR_RACE_STATUS_HTML[carStatus];
    });
  }

  renderCarRaceSection() {
    const { carRaceCount } = this.model;

    this.carRaceSection.style.display = 'flex';
    this.renderCarRaceHeader();

    filledArray(carRaceCount).forEach(() => {
      this.renderCarRaceRow();
    });
  }

  render() {
    const { carRaceCount } = this.model;
    const showCarRaceSection = carRaceCount > 0;

    if (showCarRaceSection) {
      this.renderCarRaceSection();
    }
  }
}

export default CarRace;
