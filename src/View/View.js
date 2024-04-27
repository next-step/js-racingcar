import CONSTANTS from '../constants/Constants.js';
import MESSAGES from '../constants/Messages.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';

class View {
  #inputView = InputView;

  #outputView = OutputView;

  async readCars() {
    const userInput = await this.#inputView.readlineAsync(
      MESSAGES.request.inputData,
    );

    const cars = userInput.split(',');

    return cars;
  }

  printMessage(string) {
    this.#outputView.print(string);
  }

  printRoundState(result) {
    const output = result.reduce(
      (acc, cur) =>
        `${acc}${cur.name} : ${CONSTANTS.car.move.symbol.repeat(cur.position)}\n`,
      '',
    );

    this.#outputView.print(output);
  }

  printWinners(winners) {
    const output = `${winners.join(', ')}${MESSAGES.output.gameWinner}`;

    this.#outputView.print(output);
  }
}

export default View;
