import Car from '../Car/index.js';
import RacingGame from '../RacingGame/index.js';
import { getUserInputByQuestion } from '../utils/getUserInputByQuestion.js';
import { printMessage } from '../utils/printMessage.js';
import { splitStringByComma } from '../utils/splitStringByComma.js';
import { MAX_ROUNDS } from './constants.js';
import { validateCarName } from './utils.js';

class GameSimulator {
  #racingGame;

  async setRacingGame() {
    const inputString = await getUserInputByQuestion(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).'
    );
    const carNames = splitStringByComma(inputString);

    carNames.forEach((name) => validateCarName(name));

    this.#racingGame = new RacingGame(carNames.map((name) => new Car(name)));
  }

  runRound() {
    this.#racingGame.runRound();
    this.#racingGame.getCars().forEach((car) => car.printInfo());
  }

  startRound() {
    printMessage('\n실행 결과\n');

    for (let i = 0; i < MAX_ROUNDS; i++) {
      this.runRound();
      printMessage('');
    }
  }

  getWinningCarNames() {
    return this.#racingGame.getWinningCars().map((car) => car.getName());
  }

  printWinningCars() {
    const winningCarNames = this.getWinningCarNames().join(',');

    printMessage(`${winningCarNames}가 최종 우승했습니다.`);
  }

  async startGame() {
    await this.setRacingGame();
    this.startRound();
    this.printWinningCars();
  }
}

export default GameSimulator;
