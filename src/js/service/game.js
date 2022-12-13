import { GAME_CONDITION } from '../constants/condition.js';

import gameSetting from '../model/GameSetting.js';
import Car from '../model/Car.js';

import { generateRandomNumber } from '../utils/index.js';

import { showPlayGame } from '../view/playGame.js';
import { showWinners } from '../view/gameWinner.js';

const isMovable = () => {
  const { MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER } = GAME_CONDITION;
  const randomNumber = generateRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER);

  return randomNumber >= GAME_CONDITION.MOVABLE_MIN_NUMBER;
};

const updateCarDistance = (car) => {
  if (isMovable()) {
    car.move();
  }
};

const raceOneTurn = (cars) => {
  cars.forEach((car) => updateCarDistance(car));
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

export const startGame = () => {
  const carNames = gameSetting.getNames();
  const trialCount = gameSetting.getTrialCount();

  const cars = carNames.map((carName) => new Car(carName));

  [...Array(trialCount)].forEach(() => raceOneTurn(cars));

  showPlayGame(cars);

  const winners = getWinners(cars);
  showWinners(winners);
};
