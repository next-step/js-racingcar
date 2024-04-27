export function writeRacingCar(input) {
  if (!input) {
    throw new TypeError('올바르지 않은 입력입니다.');
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
  return `${car.name} : ${readCarPosition(car.position)}`;
}
