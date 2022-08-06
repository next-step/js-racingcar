class RacingCarInfo {
  #raceParticipateCar;
  #raceForward = {};
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
export default new RacingCarInfo();
