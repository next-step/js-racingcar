import { GAME_CONDITION } from '../constants/condition.js';

import gameSetting from '../model/GameSetting.js';
import Car from '../model/Car.js';

import { generateRandomNumber } from '../utils/index.js';

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

const raceTotalTurn = ({ cars, trialCount }) => {
  [...Array(trialCount)].forEach(() => raceOneTurn(cars));
};

export const startGame = () => {
  const carNames = gameSetting.getNames();
  const trialCount = gameSetting.getTrialCount();

  const cars = carNames.map((carName) => new Car(carName));

  raceTotalTurn({ cars, trialCount });
};
