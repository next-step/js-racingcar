class Car {
  #name;
  #location;
  #goToX() {
    this.#location.x += 1;
  }
  #goToY() {
    this.#location.y += 1;
  }
  #goToZ() {
    this.#location.z += 1;
  }

  getGoToX() {
    return this.#goToX();
  }

  getGoToY() {
    return this.#goToY();
  }

  getGoToZ() {
    return this.#goToZ();
  }

  constructor() {
    this.#name = 0;
    this.#location = {
      x: 0,
      y: 0,
      z: 0,
    };
  }
}
