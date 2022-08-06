class RacingCarInfo {
  #raceParticipateCar;

  setRaceParticipateCar(raceParticiapateCar) {
    this.#raceParticipateCar = raceParticiapateCar;
  }
  getRaceParticipateCar() {
    return this.#raceParticipateCar;
  }
}
export default new RacingCarInfo();
