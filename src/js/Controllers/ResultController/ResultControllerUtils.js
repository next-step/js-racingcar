export function getWinnersName(carDistances) {
  const winnerDistance = Math.max(...carDistances.map(car => car.distance));
  return carDistances.filter(car => car.distance === winnerDistance);
}
