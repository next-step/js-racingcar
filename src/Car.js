export class Car {
  name;
  distance;

  constructor(name) {
    this.name = name;
    this.distance = 0;
    this.winCount = 0;
  }

  move(distance) {
    if (distance < 4) {
      return false;
    }

    this.distance += 1;

    return true;
  }
}
