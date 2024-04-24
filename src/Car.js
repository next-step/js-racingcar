class Car {

  name;
  position = 0;

  constructor(name) {
    this.name = name;
  }

  move() {
    const randomValue = Math.floor(Math.random() * 10);
    if (randomValue >= 4) {
      this.position += 1
    }
  }

  get name() {
    return this.name;
  }

  get position() {
    return this.position;
  }
}

export default Car;