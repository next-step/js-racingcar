import Car from '../Car/index.js';
import RacingGame from '../RacingGame/index.js';
import { getUserInputByQuestion } from '../utils/getUserInputByQuestion.js';
import {
  CAR_NAME_ERROR_MESSAGE,
  CAR_NAME_LENGTH,
  MAX_ROUNDS,
} from './constants.js';

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

    carNames.forEach((name) => this.validateCarName(name));

    this.#racingGame = new RacingGame(carNames.map(Car.of));
  }

  validateCarName(carName) {
    if (carName.length <= CAR_NAME_LENGTH.MIN) {
      throw new Error(CAR_NAME_ERROR_MESSAGE.LESS_THAN_MIN);
    }

    if (carName.length > CAR_NAME_LENGTH.MAX) {
      throw new Error(CAR_NAME_ERROR_MESSAGE.OVER_THAN_MAX);
    }
  }

  runRound() {
    this.#racingGame.runRound();
    this.#racingGame.getCars().forEach((car) => {
      this.printCarStatus(car.getName(), car.getDistanceDriven());
    });
  }

  startRound() {
    this.#messageViewer('\n실행 결과\n');

    for (let i = 0; i < MAX_ROUNDS; i++) {
      this.runRound();
      this.#messageViewer('');
    }
  }

  getWinningCarNames() {
    return this.#racingGame.getWinningCars().map((car) => car.getName());
  }

  printCarStatus(name, distanceDriven) {
    const formattedStatus = `${name} : ${'-'.repeat(distanceDriven)}`;

    this.#messageViewer(formattedStatus);
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

      this.startRound();
      this.printWinningCars();
    } catch (error) {
      this.forceFinish(error.message);
    }
  }
}

export default GameSimulator;
