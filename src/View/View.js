import MESSAGES from '../constants/Messages';
import InputView from './InputView';
import OutputView from './OutputView';

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

  printRoundState(cars) {
    const output = cars.reduce(
      (acc, cur) => `${acc}${cur.name} : ${'-'.repeat(cur.position)}\n`,
      '',
    );

    this.#outputView.print(output);
  }
}

export default View;
