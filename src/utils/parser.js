import { MESSAGE, UTIL } from '../constants';

export const splitCarNameToArray = (userInput) =>
  userInput.split(UTIL.CAR_NAME_DELIMITER);

export const getRacingResult = (name, distance) => {
  const repeatedDistanceSymbol = UTIL.DISTANCE_SYMBOL.repeat(distance);

  return `${name} : ${repeatedDistanceSymbol}`;
};

export const findMaxDistance = (cars) => {
  const maxDistance = cars.reduce(
    (distance, car) => Math.max(distance, car.getDistance()),
    0
  );

  return maxDistance;
};

export const findWinners = (cars, maxDistance) => {
  const winners = cars.reduce((winnersArray, car) => {
    if (car.getDistance() === maxDistance) {
      winnersArray.push(car.getName());
    }

    return winnersArray;
  }, []);

  return winners;
};

export const parseGameResult = (gameProgress, winners) =>
  MESSAGE.RACING_GAME.GAME_RESULT(gameProgress, winners);
