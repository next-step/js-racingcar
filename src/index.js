import { RacingSystem } from './controller/RacingSystem.js';
import { MESSAGES, SETTINGS } from './constants/index.js';
import { terminal } from './util/getReadLine.js';

const racingSystem = new RacingSystem(SETTINGS.ROUND, SETTINGS.SEPERATOR);

function main() {
  terminal.question(`${MESSAGES.GAME.START_PROMPT}\n`, (answer) => racingSystem.startGame(answer));
}

main();
