import Car from '../Car/index.js';
import RacingGame from '../RacingGame/index.js';
import { getUserInputByQuestion } from '../utils/getUserInputByQuestion.js';

class GameSimulator {
  #racingGame;
  #messageViewer;

  constructor(messageViewer) {
    this.#messageViewer = messageViewer;
  }

  async setRacingGame() {
    const inputString = await getUserInputByQuestion(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).'
    );
    const carNames = inputString.split(',');

    this.#racingGame = new RacingGame(carNames.map(Car.of));
  }

  runRound() {
    this.#racingGame.runRound();
    this.#racingGame.getCars().forEach((car) => {
      this.printCarStatus(car.getName(), car.getDistanceDriven());
    });
  }

  getWinningCarNames() {
    return this.#racingGame.getWinningCars().map((car) => car.getName());
  }

  printCarStatus(name, distanceDriven) {
    const formattedStatus = `${name} : ${'-'.repeat(distanceDriven)}`;

    this.#messageViewer(formattedStatus);
  }

  printRecords() {
    this.#messageViewer('\n실행 결과\n');

    this.#racingGame.getRecords().forEach((records) => {
      records.forEach(({ name, distanceDriven }) =>
        this.printCarStatus(name, distanceDriven)
      );
      this.#messageViewer('\n');
    });
  }

  printWinningCars() {
    const winningCarNames = this.getWinningCarNames().join(',');

    this.#messageViewer(`${winningCarNames}가 최종 우승했습니다.`);
  }

  forceFinish(message) {
    this.#messageViewer(message);
    this.#messageViewer('프로그램을 종료하겠습니다.');

    process.exit(1);
  }

  async startGame() {
    try {
      await this.setRacingGame();

      this.#racingGame.startRace();
      this.printRecords();
      this.printWinningCars();
    } catch (error) {
      this.forceFinish(error.message);
    }
  }
}

export default GameSimulator;
