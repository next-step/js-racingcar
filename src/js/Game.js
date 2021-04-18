import { Input } from './Input.js';
import { Cars } from './Cars.js';

export class Game {
  constructor() {
    this.cars = [];
    this.raceTimes = 0;

    this.Cars = new Cars();
    this.Input = new Input({
      onSubmit: ({ cars, raceTimes }) => {
        this.Cars.setState({ cars, raceTimes });
      },
    });
  }
}
