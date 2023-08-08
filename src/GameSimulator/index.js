import Car from '../Car/index.js';
import RacingGame from '../RacingGame/index.js';
import { getUserInputByQuestion } from '../utils/getUserInputByQuestion.js';

class GameSimulator {
  #racingGame;
  #gameViewer;
  checkCanMoveForward;

  constructor(gameViewer, checkCanMoveForward) {
    this.#gameViewer = gameViewer;
    this.checkCanMoveForward = checkCanMoveForward;
  }

  async setRacingGame() {
    const inputString = await getUserInputByQuestion(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).'
    );
    const carNames = inputString.split(',');
    const cars = carNames.map(Car.of);
    const maxRounds = await getUserInputByQuestion('시도할 회수는 몇회인가요?');

    this.#racingGame = new RacingGame(cars, maxRounds);
  }

  async startGame() {
    try {
      await this.setRacingGame();

      this.#racingGame.startRace({
        checkCanMoveForward: this.checkCanMoveForward,
      });
      this.#gameViewer.printRecords(this.#racingGame.records);
      this.#gameViewer.printWinningCars(this.#racingGame.winningCars);
    } catch (error) {
      this.#gameViewer.printRestart(error.message);
      this.startGame();
    }
  }
}

export default GameSimulator;
