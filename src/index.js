import { MESSAGES } from './constants/index.js';
import { RacingSystem } from './controller/RacingSystem.js';
import { GameSettings } from './model/GameSettings.js';
import { terminal } from './util/getReadLine.js';

const racingSystem = new RacingSystem(new GameSettings());

//eslint-disable-next-line max-lines-per-function
function main() {
  terminal.question(`${MESSAGES.GAME.START_PROMPT}\n`, (answer) => {
    try {
      racingSystem.startGame(answer);
    } catch (error) {
      console.error(error);
    } finally {
      terminal.close();
    }
  });
}

main();
