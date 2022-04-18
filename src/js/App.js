import { $ } from './utils/index.js';
import { getCardBoardTemplate, getWinnerNamesTemplate } from './view/Template.js';
import { hiddenEl, showEl } from './view/common.js';
import Car from './service/Car.js';

class App {
  constructor() {
    this.cars = null;
    this.$nameInput = $('#racing-name input');
    this.$countInput = $('#racing-count input');
    $('#racing-name form').addEventListener('submit', this.sendCarNames);
    $('#racing-count form').addEventListener('submit', this.sendChallengeCount);
    $('#racing-result button').addEventListener('click', this.reset);

    $('#racing-name input').focus();
  }

  sendChallengeCount = (e) => {
    e.preventDefault();
    const challengeCount = this.$countInput.value;

    this.cars.forEach((car) => car.forwardCar(Number(challengeCount)));

    this.$countInput.disabled = true;
    $('#racing-count button').disabled = true;
    showEl($('#racing-board'));
    this.carBoardRender();
    this.carResultRender();
  };

  sendCarNames = (e) => {
    e.preventDefault();
    const carNames = this.$nameInput.value.split(',');
    this.cars = carNames.map((carName) => new Car(carName.trim()));
    const isValidCarNames = this.cars.every((car) => car.name);

    if (!isValidCarNames) return;

    $('#racing-name button').disabled = true;
    this.$nameInput.disabled = true;
    showEl($('#racing-count'));
    $('#racing-count input').focus();
  };

  getWinners() {
    const maxDistance = Math.max(...this.cars.map((car) => car.processCount));
    this.cars.forEach((car) => car.setIsWinner(maxDistance));
    return this.cars.filter((car) => car.isWinner).map((car) => car.name);
  }

  reset = () => {
    this.cars = null;

    this.resetCarBoard();
    this.resetCarCount();
    this.resetCardName();
    this.resetResult();

    this.$nameInput.focus();
  };

  resetCardName() {
    this.$nameInput.value = '';
    this.$nameInput.disabled = false;
    $('#racing-name button').disabled = false;
  }

  resetCarCount() {
    this.$countInput.value = '';
    hiddenEl($('#racing-count'));
    this.$countInput.disabled = false;
    $('#racing-count button').disabled = false;
  }

  resetCarBoard() {
    hiddenEl($('#racing-board'));
  }

  resetResult() {
    hiddenEl($('#racing-result'));
  }

  carBoardRender() {
    $('#racing-board').innerHTML = getCardBoardTemplate(this.cars);
  }

  carResultRender() {
    const winners = this.getWinners();
    showEl($('#racing-result'));
    $('#racing-result #winner-names').innerHTML = getWinnerNamesTemplate(winners);
  }
}

export default App;
