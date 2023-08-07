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
    const maxRounds = await getUserInputByQuestion('시도할 회수는 몇회인가요?');

    this.#racingGame = new RacingGame(carNames.map(Car.of), maxRounds);
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
    const winningCarNames = this.#racingGame
      .getWinningCars()
      .map((car) => car.getName())
      .join(',');

    this.#messageViewer(`${winningCarNames}가 최종 우승했습니다.`);
  }

  async startGame() {
    try {
      await this.setRacingGame();

      this.#racingGame.startRace();
      this.printRecords();
      this.printWinningCars();
    } catch (error) {
      this.#messageViewer(error.message);
      this.#messageViewer('\n게임을 다시 시작하겠습니다.\n');
      this.startGame();
    }
  }
}

export default GameSimulator;
