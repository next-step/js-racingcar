import { UTIL } from '../constants';

export const splitCarNameToArray = (userInput) =>
  userInput.split(UTIL.CAR_NAME_DELIMITER);

export const getRacingResult = (name, distance) => {
  const repeatedDistanceSymbol = UTIL.DISTANCE_SYMBOL.repeat(distance);

  return `${name} : ${repeatedDistanceSymbol}`;
};

export const findMaxDistance = (cars) => {
  let maxDistance = 0;

  cars.forEach((car) => {
    if (car.getDistance() > maxDistance) maxDistance = car.getDistance();
  });

  return maxDistance;
};

export const findWinners = (cars, maxDistance) => {
  let winners = [];

  cars.forEach((car) => {
    if (car.getDistance() === maxDistance) winners.push(car.getName());
  });

  return winners;
};

export const parseGameResult = (gameProgress, winners) =>
  gameProgress + `${winners.join(',')}가 최종 우승했습니다.`;
