import { validateCarName } from "./car.contract";

export class Car {
  constructor({ name }) {
    validateCarName(name);

    this.name = name;
  }
  move() {}
}
