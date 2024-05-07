export function printCarPosition(car) {
  console.log(`${car.name}: ${'-'.repeat(car.position)}`);
}

export function printRaceWinners(race) {
  console.log(race.winners.map(winner => winner.name).join(', '));
}
