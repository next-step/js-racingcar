import Car from '../Car/index.js';
import RacingGame from '../RacingGame/index.js';
import { getUserInputByQuestion } from '../utils/getUserInputByQuestion.js';
import { splitStringByComma } from '../utils/splitStringByComma.js';

class GameSimulator {
  #racingGame;

  async setRacingGame() {
    const inputString = await getUserInputByQuestion(
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).'
    );
    const carNames = splitStringByComma(inputString);

    this.#racingGame = new RacingGame(carNames.map((name) => new Car(name)));
  }

  async startGame() {
    await this.setRacingGame();
  }
}

export default GameSimulator;
