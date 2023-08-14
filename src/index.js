import { MESSAGES } from './domain/constants/index.js';
import { RacingSystem } from './domain/controller/RacingSystem.js';
import { validateNames, validateRound } from './domain/validator.js';
import { readlineController } from './util/index.js';

const racingSystem = new RacingSystem();

async function main() {
  const NAMES = await readlineController.questionReadline(
    `${MESSAGES.GAME.START_PROMPT}`,
    validateNames,
  );
  const ROUND = await readlineController.questionReadline(
    `${MESSAGES.GAME.ROUND_HEADER}`,
    validateRound,
  );
  racingSystem.startGame(NAMES, ROUND);
  readlineController.closeReadline();
}

main();
