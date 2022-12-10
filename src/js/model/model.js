export class Car {
  #name = "";
  #position;

  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }

  get carName() {
    return this.#name.trim();
  }

  get forward() {
    return (this.#position += 1);
  }
}

export const getCarClassList = (element) =>
  element.value.split(",").map((carName) => new Car(carName));
