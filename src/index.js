import { Car } from './domain/car.js';
import { movable } from './domain/random_move_strategy.js';

const RACE_ROUND = 5;

const run = () => {  
  const names = ['a', 'b', 'c', 'd', 'e'];
  const cars = names.map((name) => new Car(name));

  for (let i = 0; i < RACE_ROUND; i++) {
    cars.forEach((car) => {
      car.move(movable);
    });
  }
}

run();
