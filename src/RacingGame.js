import View from './view/View';
import CarRace from './domain/CarRace';
import Car from './domain/car';

export default class RacingGame {
  #race;
  #view;
  #raceResult = '';

  constructor() {
    this.#race = new CarRace();
    this.#view = new View();
    this.#init().then(() => {
      this.start();
    });
  }

  #init = async () => {
    while (this.#race?.participants === undefined) {
      await this.#setRace();
    }

    while (this.#race?.lapCount < 1) {
      await this.#setRaceLap();
    }
    this.#view.closeInput();
  };

  #setRace = async () => {
    try {
      const carNames = await this.#view.input(
        '경주할 자동차 이름을 입력하세요(이름은 쉽표(,)를 기준으로 구분).'
      );
      if (carNames) {
        const cars = carNames.split(',').map((name) => new Car(name));
        this.#race.addParticipants(cars);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  #setRaceLap = async () => {
    try {
      const lapCount = await this.#view.input('시도할 회수는 몇회인가요?');
      if (lapCount) {
        this.#race.lapCount = lapCount;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  #startRace() {
    for (let i = 0; i < this.#race.lapCount; i++) {
      this.#race.participants.forEach((car) => car.runOneLap());
      this.#setRaceResult(this.#race.participants);
    }
  }

  #setRaceResult(cars) {
    for (const car of cars) {
      const name = car.name;
      const distance = car.distance;
      this.#raceResult += `${name} : ${'-'.repeat(distance)}\n`;
    }
  }

  start() {
    this.#view.printMessage('실행결과');
    this.#view.printMessage(this.#race.participantNames);

    this.#startRace();

    this.#view.printMessage(this.#raceResult);
    this.#view.printMessage(`${this.#race.winnerNames}가 최종 우승했습니다.`);
  }
}
