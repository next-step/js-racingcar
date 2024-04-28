import { ERROR_MESSAGE } from '../constnats';

export function writeRacingCar(input) {
  if (!input) {
    throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
  }
  return input.replace(/\s/g, '').split(',');
}

export function readCarPosition(position) {
  return '-'.repeat(position);
}

export function readWinners(winners) {
  return winners.toString().replace(/,/g, ', ');
}

export function readCarProgress(car) {
  return `${car.carName} : ${readCarPosition(car.position)}`;
}
