import ThrowMessage from '../utils/ThrowMessage';

export function writeRacingCar(input) {
  new ThrowMessage(input).isTruthy();

  return input.replace(/\s/g, '').split(',');
}

export function writeNumber(input) {
  const value = Number(input);

  new ThrowMessage(value).maxSafeInteger().isInteger();

  return value;
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
