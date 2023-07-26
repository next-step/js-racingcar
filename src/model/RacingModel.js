export default class RacingModel {
  carList;

  constructor() {
    this.carList = [];
  }

  settingCarName(carNames) {
    carNames.forEach((carName) => {
      this.carList.push({
        name: carName,
        position: 0,
      });
    });
  }

  getCarInfo() {
    return this.carList;
  }

  settingCarPosition(carIndex) {
    this.carList[carIndex].position++;
  }

  getWinners() {
    const maxPositionValue = Math.max(...this.carList.map((car) => car.position));
    const winners = this.carList.filter((car) => car.position === maxPositionValue);

    return [...winners.map((winner) => winner.name)];
  }
}
