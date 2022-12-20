export class Car {
  #name = '';

  constructor(name) {
    console.log(name);
    this.#name = name;
  }
}
