import InputView from './InputView';
import MESSAGES from '../constants/Messages';

class View {
  #inputView = InputView;

  async readCars() {
    const userInput = await this.#inputView.readlineAsync(
      MESSAGES.request.inputData,
    );

    const cars = userInput.split(',');

    return cars;
  }
}

export default View;
