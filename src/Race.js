class Race {
  carList;
  raceCount;
  distancePerMove;

  constructor(carList, raceCount, distancePerMove) {
    this.carList = carList;
    this.raceCount = raceCount;
    this.distancePerMove = distancePerMove;
  }

  static parseCarNameList(racingCarInput, divider) {
    return racingCarInput.split(divider).map((name) => name.toString().trim());
  }

  moveCar(car) {
    Array.from({ length: this.distancePerMove }).forEach(() => car.move());
  }

  start() {
    return Array.from({ length: this.raceCount }).map(() => {
      const roundResult = {};
      this.carList.forEach((car) => {
        this.moveCar(car);
        roundResult[car.name] = car.position;
      });
      return roundResult;
    });
  }
}

export default Race;
