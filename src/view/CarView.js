import { MESSAGES } from '../constants/messages.js';

class CarView {
  printResultHeader() {
    console.log(`\n${MESSAGES.GAME.RESULT_HEADER}`);
  }

  printCarPosition(key, value) {
    console.log(`${key} : ${'-'.repeat(value)}`);
  }

  printBreakLine() {
    console.log();
  }

  printWinners(winners) {
    console.log(`${winners.join(', ')}${MESSAGES.GAME.WINNER_ANNOUNCEMENT}`);
  }
}

export default CarView;
