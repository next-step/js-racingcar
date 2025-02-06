class Car {
  #name;

  #location;

  getName() {
    return this.#name;
  }

  setName(name) {
    this.#name = name;
  }

  getLocation() {
    return this.#location;
  }

  setLocation(location) {
    this.#location = location;
  }

  goToX() {
    this.#location.x += 1;
  }

  goToY() {
    this.#location.y += 1;
  }

  goToZ() {
    this.#location.z += 1;
  }

  constructor(name) {
    this.#name = name;
    this.#location = {
      x: 0,
      y: 0,
      z: 0,
    };
  }
}

export default Car;
