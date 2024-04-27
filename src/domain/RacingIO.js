export function writeRacingCar(input) {
  return input.replace(/\s/g, '').split(',');
}

export function readCarPosition(position) {
  return '-'.repeat(position);
}

export function readWinners(winners) {
  return winners.toString().replace(/,/g, ', ');
}
