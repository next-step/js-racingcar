export class Car {
  constructor(name) {
    this.name = name;
    this.position = 0;
  }

  forward() {
    this.position += 1;
  }
}

export const getCarClassList = (element) =>
  element.value.split(",").map((carName) => new Car(carName.trim()));
