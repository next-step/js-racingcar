import { input, closeReadLine } from '../utils/console';

export default class View {
  async input(question) {
    return await input(`${question}\n`);
  }

  closeInput() {
    closeReadLine();
  }

  printMessage(message) {
    console.log(message);
  }
}
