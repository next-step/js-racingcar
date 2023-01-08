export function getWinnersName(carStates) {
  const winnerDistance = Math.max(...carStates.map(car => car.distance));
  return carStates.filter(car => car.distance === winnerDistance).map(({ name }) => name);
}
