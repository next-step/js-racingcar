export default class Car {
  name;
  distance;

  constructor(name, advanceCondition) {
    this.name = name;
    this.distance = 0;
    this.advanceCondition = advanceCondition;
  }

  getName() {
    return this.name;
  }

  getDistance() {
    return this.distance;
  }

  advance() {
    if (this.advanceCondition(this.name, this.distance)) {
      this.distance += 1;
    }
  }
}
