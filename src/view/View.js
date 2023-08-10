import { GAME_MESSAGES, MOVEMENT_PRINT } from "../constants/constants.js";

export default class View {
  static printGameStartMessage() {
    View.#print(GAME_MESSAGES.GAME_START);
  }

  static printCarAndMove(name, movement) {
    View.#print(`${name}: ${MOVEMENT_PRINT.repeat(movement)}`);
  }

  static printErrorMessage(errorMessage) {
    View.#print(errorMessage);
  }

  static printWinnerMessage(winnersName) {
    View.#print(winnersName + GAME_MESSAGES.WINNER_ALERT_SUFFIX);
  }

  static printPerRoundEnd() {
    View.#print(GAME_MESSAGES.PER_ROUND_END);
  }

  static printGameEndMessage() {
    View.#print(GAME_MESSAGES.GAME_OVER);
  }

  static #print(message) {
    console.log(message);
  }
}
