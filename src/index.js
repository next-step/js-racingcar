import { Car } from './domain/car.js';
import { movable } from './domain/random_move_strategy.js';
import { getWinners } from './domain/winners.js';
import { inputNames } from './view/input_view.js';
import { printCar, printWinners } from './view/output_view.js';

const RACE_ROUND = 5;

const main = async () => {
  const names = await inputNames();
  const cars = names.map((name) => new Car(name));

  console.log('실행 결과');
  for (let i = 0; i < RACE_ROUND; i++) {
    cars.forEach((car) => {
      car.move(movable);
      printCar(car);
    });
    console.log();
  }

  const winners = getWinners(cars);
  printWinners(winners);
};

main();
