export class RacingCarModel {
  #name = '';

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name.split(',').map((elem) => elem.trim());
  }

  set name(name) {
    this.#name = name;
  }
}
