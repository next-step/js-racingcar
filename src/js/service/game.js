import { GAME_CONDITION } from '../constants/condition.js';

import gameSetting from '../model/GameSetting.js';
import Car from '../model/Car.js';

import { generateRandomNumber } from '../utils/index.js';

import { removeAllSpinners, showCarNames, showMoving } from '../view/playGame.js';
import { showWinners, showGameResult } from '../view/gameResult.js';

const isMovable = () => {
  const { MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER, MOVABLE_MIN_NUMBER } = GAME_CONDITION;
  const randomNumber = generateRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER);

  return randomNumber >= MOVABLE_MIN_NUMBER;
};

const updateCarMoving = (car) => {
  if (isMovable()) {
    car.move();
    showMoving(car);
  }
};

const raceOneTurn = (cars) => {
  cars.forEach((car) => updateCarMoving(car));
};

const getWinners = (cars) => {
  const distanceByCar = cars.map((car) => car.getDistance());
  const maxDistance = Math.max(...distanceByCar);
  const winners = [];

  distanceByCar.forEach((distance, idx) => {
    if (distance === maxDistance) {
      winners.push(cars[idx].getName());
    }
  });

  return winners;
};

const celebrateWinners = (winners) => {
  setTimeout(() => {
    alert(`${winners.join(', ')} 축하합니다!`);
  }, 2000);
};

export const startGame = () => {
  const carNames = gameSetting.getNames();
  const trialCount = gameSetting.getTrialCount();
  const { INTERVAL_TIME } = GAME_CONDITION;

  const cars = carNames.map((carName) => new Car(carName));

  showCarNames(cars);

  let currentCount = 0;

  const intervalTimer = setInterval(() => {
    raceOneTurn(cars);

    currentCount += 1;

    if (currentCount === trialCount) {
      clearInterval(intervalTimer);
      removeAllSpinners();

      const winners = getWinners(cars);

      showGameResult();
      showWinners(winners);

      celebrateWinners(winners);
    }
  }, INTERVAL_TIME);
};
