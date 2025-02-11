class Race {
  carList;
  raceCount;
  distancePerMove;

  constructor(carList, raceCount, distancePerMove) {
    this.carList = carList;
    this.raceCount = raceCount;
    this.distancePerMove = distancePerMove;
  }

  moveCarPerRound(car) {
    Array.from({ length: this.distancePerMove }).forEach(() => car.move());
  }

  playRound() {
    const roundResult = {};
    this.carList.forEach((car) => {
      this.moveCarPerRound(car);
      roundResult[car.name] = car.position;
    });
    return roundResult;
  }

  start() {
    return Array.from({ length: this.raceCount }).map(() => {
      return this.playRound();
    });
  }
}

export default Race;
