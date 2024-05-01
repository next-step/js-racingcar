import CONSTANTS from '../constants/Constants.js';
import MESSAGES from '../constants/Messages.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';

class View {
  #inputView = InputView;

  #outputView = OutputView;

  async readCarNames() {
    const userInput = await this.#inputView.readlineAsync(
      MESSAGES.request.inputData,
    );

    const carNames = userInput.split(',');

    return carNames;
  }

  printMessage(message) {
    this.#outputView.print(message);
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

  printGameResult({ results, winners }) {
    this.printMessage(MESSAGES.output.gameResult);

    results.forEach(result => {
      this.printRoundState(result);
    });

    this.printWinners(winners);
  }
}

export default View;
