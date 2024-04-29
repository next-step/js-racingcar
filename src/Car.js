export class Car {
  name;
  distance;
  winCount;

  constructor(name) {
    this.name = name;
    this.distance = 0;
    this.winCount = 0;
  }

  move(distance) {
    this.distance += distance;
  }

  win() {
    this.winCount += 1;
  }
}
