import CarRace from './CarRace';
import Car from './Car';

export default class RacingGame {
  #race;
  #raceResult = '';

  constructor(carNames, lapCount) {
    this.#race = new CarRace();

    this.#init(carNames, lapCount);
  }

  #init = (carNames, lapCount) => {
    const cars = carNames.split(',').map((name) => new Car(name));
    this.#race.addParticipants(cars);
    this.#race.lapCount = lapCount;
  };

  #setRaceResult(cars) {
    for (const car of cars) {
      const name = car.name;
      const distance = car.distance;
      this.#raceResult += `${name} : ${'-'.repeat(distance)}\n`;
    }
  }

  startRace() {
    for (let i = 0; i < this.#race.lapCount; i++) {
      this.#race.participants.forEach((car) => car.runOneLap());
      this.#setRaceResult(this.#race.participants);
    }
  }

  get raceResult() {
    return this.#raceResult;
  }

  get participantNames() {
    return this.#race.participantNames;
  }

  get winnerNames() {
    return this.#race.winnerNames;
  }
}
