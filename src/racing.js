export function* racingGameGenerator(cars) {
  const MAXIMUM_ROUND = 5;
  let round = 0;

  while (round < MAXIMUM_ROUND) {
    moveCars(cars);
    yield cars;
    round++;
  }
}

const moveCars = (cars) => {
  for (const car of cars) {
    car.moveForward();
  }
};
