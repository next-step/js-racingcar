import {
  $,
  eventHandler,
  handleElement,
  getRandomNumber,
} from './utils/utils.js';
import { MESSAGE, GAME } from './utils/constants.js';
import player from './components/Player.js';

const { disableElement, showElement, hiddenElement } = handleElement;

function Game() {
  const carNameInput = $('#car-name-input');
  const carNameBtn = $('#car-name-btn');
  const tryCountSection = $('#try-count-section');
  const tryCountInput = $('#try-count-input');
  const tryCountBtn = $('#try-count-btn');
  const gameArea = $('#game-area');
  const resultSection = $('#result-section');
  const winnerMessage = $('#winner');
  let carNames;
  let gameCount;

  this.winner = (carInfo) => {
    const maxValue = Math.max(...Object.values(carInfo));
    return [...Object.keys(carInfo)]
      .filter((car) => carInfo[car] === maxValue)
      .join(', ');
  };

  this.renderResult = (carInfo) => {
    console.log(carInfo);
    const result = this.winner(carInfo);
    winnerMessage.innerHTML = `🏆 최종 우승자: ${result} 🏆`;
    showElement(resultSection);
  };

  this.decideGoStop = (carInfo) => {
    const cars = document.querySelectorAll('div[data-player]');

    for (const item of cars) {
      const player = item.dataset.player;
      const randomNumber = getRandomNumber(GAME.MIN_COUNT, GAME.MAX_COUNT);

      if (!carInfo[player]) {
        carInfo[player] = 0;
      }

      if (randomNumber <= GAME.BASE_COUNT) {
        continue;
      }
      carInfo[player] += 1;
    }
    return carInfo;
  };

  this.startGame = () => {
    gameArea.innerHTML = this.setCars(carNames);
    const carInfo = Array.from({ length: gameCount }, () => 0).reduce(
      (prev, next) => {
        prev = { ...this.decideGoStop(prev) };
        return prev;
      },
      {},
    );
    this.renderResult(carInfo);
  };

  this.checkCarLength = (carNames) => {
    return carNames.split(',').find((car) => car.trim().length > 5);
  };

  this.checkGameCount = (count) => {
    return Number(count) < 1 || !Number.isInteger(Number(count));
  };

  this.setCars = (cars) => {
    return cars.reduce((html, car) => {
      return (html += player({ name: car.trim() }));
    }, '');
  };

  this.onClickCarNameBtn = (e) => {
    e.preventDefault();
    if (this.checkCarLength(carNameInput.value)) {
      alert(MESSAGE.NAME_ALERT);
      return;
    }
    carNames = carNameInput.value.split(',').map((car) => car.trim());
    [carNameInput, carNameBtn].forEach((el) => disableElement(el));
    showElement(tryCountSection);
  };

  this.onClickCarTryCountBtn = (e) => {
    e.preventDefault();
    if (this.checkGameCount(tryCountInput.value)) {
      alert(MESSAGE.TRY_ALERT);
      return;
    }
    gameCount = Number(tryCountInput.value);
    [tryCountInput, tryCountBtn].forEach((el) => disableElement(el));
    this.startGame();
  };

  this.init = () => {
    eventHandler({
      el: carNameBtn,
      type: 'click',
      callback: this.onClickCarNameBtn,
    });

    eventHandler({
      el: tryCountBtn,
      type: 'click',
      callback: this.onClickCarTryCountBtn,
    });
  };

  this.init();
}

export default Game;
