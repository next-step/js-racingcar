import Car from './car.js';
import CarRace from './carRace.js';
import CarRaceView from '../view/CarRaceView.js';

export class CarRacingGame {
  #carRaceView;
  #carRace;

  constructor() {
    this.#carRaceView = new CarRaceView();
  }

  #initCarRace = async () => {
    try {
      const carNames = await this.#carRaceView.inputCarName();
      if (carNames) {
        const cars = carNames.split(',').map((name) => new Car(name));
        this.#carRace = new CarRace(cars);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  #initCarRaceLap = async () => {
    try {
      const lapCount = await this.#carRaceView.inputRaceLapCount();
      if (lapCount) {
        this.#carRace.lapCount = lapCount;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  start = async () => {
    while (this.#carRace === undefined) {
      await this.#initCarRace();
    }

    while (this.#carRace.lapCount < 1) {
      await this.#initCarRaceLap();
    }
    this.#carRaceView.closeInput();

    this.#carRaceView.printMessage('실행결과');
    this.#carRaceView.printMessage(this.#carRace.participantNames);

    for (let i = 0; i < this.#carRace.lapCount; i++) {
      this.#carRace.participants.forEach((car) => car.runOneLap());
      this.#carRaceView.printLapResult(this.#carRace.participants);
    }

    this.#carRaceView.printWinners(this.#carRace.winnerNames);
  };
}
