class RacingInfoDomain {
  static MIN_CARNAME_SIZE = 1;
  static MAX_CARNAME_SIZE = 5;
  #raceParticipateCar;
  #raceForward = {};
  #matchNumber;

  testCarNameSize(carName) {
    return (
      RacingInfoDomain.MIN_CARNAME_SIZE <= carName.trim().length &&
      carName.trim().length <= RacingInfoDomain.MAX_CARNAME_SIZE
    );
  }

  findInvalidCar(carNames) {
    return carNames.find((v) => !this.testCarNameSize(v));
  }

  setRaceParticipateCar(raceParticiapateCar) {
    this.#raceParticipateCar = raceParticiapateCar;
  }

  getRaceParticipateCar() {
    return this.#raceParticipateCar;
  }

  setRaceForwardCount(index) {
    if (this.#raceForward[index]) {
      this.#raceForward[index]++;
    } else {
      this.#raceForward[index] = 1;
    }
  }

  getRaceForwardCount() {
    return this.#raceForward;
  }
}
export default new RacingInfoDomain();
