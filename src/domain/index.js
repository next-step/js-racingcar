export function getWinners(cars) {
  const maxLocation = Math.max(...cars.map((car) => car.information.location));
  return cars.filter((car) => car.information.location === maxLocation);
}

export function moveCars(cars) {
  cars.forEach((car) => car.move());
}
