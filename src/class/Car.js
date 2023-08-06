const defaultAdvanceCondition = () => {
  return Math.random() * 9 >= 4;
};

export default class Car {
  name;
  distance;

  constructor(name, advanceCondition = defaultAdvanceCondition) {
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
    if (this.advanceCondition()) {
      this.distance += 1;
    }
  }
}
